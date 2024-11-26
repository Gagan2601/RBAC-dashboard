import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Permission } from "@/types";

interface PermissionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: Partial<Permission>) => void;
    permission?: Permission;
}

interface PermissionFormValues {
    name: string;
    description: string;
    resource: string;
    action: Permission["action"];
}

const PermissionDialog = ({
    open,
    onOpenChange,
    onSubmit,
    permission,
}: PermissionDialogProps) => {
    const form = useForm<PermissionFormValues>({
        defaultValues: {
            name: "",
            description: "",
            resource: "",
            action: "read",
        },
    });

    const { reset } = form;

    useEffect(() => {
        if (permission) {
            reset({
                name: permission.name,
                description: permission.description,
                resource: permission.resource,
                action: permission.action,
            });
        } else {
            reset({
                name: "",
                description: "",
                resource: "",
                action: "read",
            });
        }
    }, [permission, reset]);

    const handleSubmit = (data: PermissionFormValues) => {
        onSubmit(data);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {permission ? "Edit Permission" : "Create Permission"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            rules={{ required: "Name is required" }}
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
                            rules={{ required: "Description is required" }}
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
                            name="resource"
                            rules={{ required: "Resource is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resource</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="action"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Action</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={(value) => field.onChange(value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an action" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="create">Create</SelectItem>
                                                <SelectItem value="read">Read</SelectItem>
                                                <SelectItem value="update">Update</SelectItem>
                                                <SelectItem value="delete">Delete</SelectItem>
                                                <SelectItem value="manage">Manage</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">
                                {permission ? "Save Changes" : "Create Permission"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default PermissionDialog;
