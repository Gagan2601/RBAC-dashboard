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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Role } from '@/types';

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: Partial<User>) => void;
    user?: User;
    roles: Role[];
}

interface UserFormValues {
    name: string;
    email: string;
    status: "active" | "inactive";
    roles: string[];
}

const UserDialog = ({
    open,
    onOpenChange,
    onSubmit,
    user,
    roles
}: UserDialogProps) => {
    const form = useForm<UserFormValues>({
        defaultValues: {
            name: '',
            email: '',
            status: 'active',
            roles: [],
        },
    });

    const { reset } = form;

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                status: user.status,
                roles: user.roles.map(r => r.id),
            });
        } else {
            reset({
                name: '',
                email: '',
                status: 'active',
                roles: [],
            });
        }
    }, [user, reset]);

    const handleSubmit = (data: UserFormValues) => {
        onSubmit({
            ...data,
            roles: roles.filter(r => data.roles.includes(r.id)),
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {user ? 'Edit User' : 'Create User'}
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
                            name="email"
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email format',
                                },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roles"
                            rules={{ validate: value => value.length > 0 || 'At least one role must be selected' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Roles</FormLabel>
                                    <div className="flex flex-wrap gap-2">
                                        {roles.map(role => (
                                            <label key={role.id} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    value={role.id}
                                                    checked={field.value.includes(role.id)}
                                                    onChange={e => {
                                                        const value = e.target.value;
                                                        const newValues = e.target.checked
                                                            ? [...field.value, value]
                                                            : field.value.filter(id => id !== value);
                                                        field.onChange(newValues);
                                                    }}
                                                />
                                                {role.name}
                                            </label>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">
                                {user ? 'Save Changes' : 'Create User'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default UserDialog;
