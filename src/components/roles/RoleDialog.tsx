import React from 'react';
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Role, Permission } from '@/types';

interface RoleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: Partial<Role>) => void;
    role?: Role;
    permissions: Permission[];
}

const RoleDialog = ({
    open,
    onOpenChange,
    onSubmit,
    role,
    permissions,
}: RoleDialogProps) => {
    const form = useForm({
        defaultValues: {
            name: role?.name || '',
            description: role?.description || '',
            permissions: role?.permissions.map(p => p.id) || [],
        },
    });

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
                            rules={{ required: 'Name is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
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
                            rules={{ maxLength: { value: 100, message: 'Description must be under 100 characters' } }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-4">
                            <FormLabel>Permissions</FormLabel>
                            {permissions.map((permission) => (
                                <FormField
                                    key={permission.id}
                                    control={form.control}
                                    name="permissions"
                                    rules={{ validate: value => value.length > 0 || 'At least one permission must be selected' }}
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(permission.id)}
                                                    onCheckedChange={(checked) => {
                                                        const updatedPermissions = checked
                                                            ? [...field.value, permission.id]
                                                            : field.value.filter((id: string) => id !== permission.id);
                                                        field.onChange(updatedPermissions);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {permission.name}
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
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

export default RoleDialog;