'use client';

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import UserTable from '@/components/users/UserTable';
import UserDialog from '@/components/users/UserDialog';
import { User, Role } from '@/types';
import { getUsers, getRoles, createUser, updateUser, deleteUser } from '@/lib/api';
import { useToast } from "@/hooks/use-toast";

export default function UsersPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | undefined>();
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to fetch users",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await getRoles();
            setRoles(response.data);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to fetch roles",
                variant: "destructive",
            });
        }
    };

    const handleCreateUser = async (userData: Partial<User>) => {
        try {
            await createUser(userData as Omit<User, 'id' | 'createdAt' | 'updatedAt'>);
            toast({
                title: "Success",
                description: "User created successfully",
            });
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to create user",
                variant: "destructive",
            });
        }
    };

    const handleUpdateUser = async (userData: Partial<User>) => {
        if (!selectedUser) return;
        try {
            await updateUser(selectedUser.id, userData);
            toast({
                title: "Success",
                description: "User updated successfully",
            });
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to update user",
                variant: "destructive",
            });
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await deleteUser(userId);
            toast({
                title: "Success",
                description: "User deleted successfully",
            });
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to delete user",
                variant: "destructive",
            });
        }
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const handleOpenChange = (open: boolean) => {
        setDialogOpen(open);
        if (!open) {
            setSelectedUser(undefined);
        }
    };
    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Users</h1>
                <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <UserTable
                users={users}
                onEdit={handleEdit}
                onDelete={handleDeleteUser}
                loading={loading}
            />

            <UserDialog
                open={dialogOpen}
                onOpenChange={handleOpenChange}
                onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
                user={selectedUser}
                roles={roles}
            />
        </div>
    );
}