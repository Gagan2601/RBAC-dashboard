import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Role, Permission } from '@/types';

interface RolesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: Partial<Role>) => void;
    role?: Role;
    permissions: Permission[];
}

interface RoleFormValues {
    name: string;
    description: string;
    permissions: string[];
}

const RolesDialog = ({
    open,
    onOpenChange,
    onSubmit,
    role,
    permissions,
}: RolesDialogProps) => {
    const form = useForm<RoleFormValues>({
        defaultValues: {
            name: '',
            description: '',
            permissions: [],
        },
    });

    const { reset } = form;

    // Update form values when the `role` prop changes
    useEffect(() => {
        if (role) {
            reset({
                name: role.name,
                description: role.description || '',
                permissions: role.permissions.map(p => p.id),
            });
        } else {
            reset({
                name: '',
                description: '',
                permissions: [],
            });
        }
    }, [role, reset]);

    const handleSubmit = (data: any) => {
        onSubmit({
            ...data,
            permissions: permissions.filter(p => data.permissions.includes(p.id)),
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {role ? 'Edit Role' : 'Create Role'}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            rules={{ required: 'Role name is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="permissions"
                            rules={{
                                validate: value =>
                                    value.length > 0 || 'At least one permission must be selected',
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Permissions</FormLabel>
                                    <div className="flex flex-wrap gap-2">
                                        {permissions.map(permission => (
                                            <label
                                                key={permission.id}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={permission.id}
                                                    checked={field.value.includes(permission.id)}
                                                    onChange={e => {
                                                        const value = e.target.value;
                                                        const newValues = e.target.checked
                                                            ? [...field.value, value]
                                                            : field.value.filter(id => id !== value);
                                                        field.onChange(newValues);
                                                    }}
                                                />
                                                {permission.name}
                                            </label>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">
                                {role ? 'Save Changes' : 'Create Role'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default RolesDialog;
