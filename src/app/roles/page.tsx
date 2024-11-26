'use client';

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RoleTable from '@/components/roles/RoleTable';
import RoleDialog from '@/components/roles/RoleDialog';
import { Role, Permission } from '@/types';
import { createRole, getRoles, getPermissions, updateRole, deleteRole } from '@/lib/api';
import { useToast } from "@/hooks/use-toast";

export default function RolesPage() {
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState<Role[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | undefined>();
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        fetchRoles();
        fetchPermissions();
    }, []);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const response = await getRoles();
            setRoles(response.data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch roles",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchPermissions = async () => {
        try {
            const response = await getPermissions();
            setPermissions(response.data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch permissions",
                variant: "destructive",
            });
        }
    };

    const handleCreateRole = async (roleData: Partial<Role>) => {
        try {
            await createRole(roleData as Omit<Role, 'id' | 'createdAt' | 'updatedAt'>);
            toast({
                title: "Success",
                description: "Role created successfully",
            });
            fetchRoles();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create role",
                variant: "destructive",
            });
        }
    };

    const handleUpdateRole = async (roleData: Partial<Role>) => {
        if (!selectedRole) return;
        try {
            await updateRole(selectedRole.id, roleData);
            toast({
                title: "Success",
                description: "Role updated successfully",
            });
            fetchRoles();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update role",
                variant: "destructive",
            });
        }
    };

    const handleDeleteRole = async (roleId: string) => {
        try {
            await deleteRole(roleId);
            toast({
                title: "Success",
                description: "Role deleted successfully",
            });
            fetchRoles();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete role",
                variant: "destructive",
            });
        }
    };

    const handleEdit = (role: Role) => {
        setSelectedRole(role);
        setDialogOpen(true);
    };

    const handleOpenChange = (open: boolean) => {
        setDialogOpen(open);
        if (!open) {
            setSelectedRole(undefined);
        }
    };

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Roles</h1>
                <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Role
                </Button>
            </div>

            <RoleTable
                roles={roles}
                onEdit={handleEdit}
                onDelete={handleDeleteRole}
                loading={loading}
            />

            <RoleDialog
                open={dialogOpen}
                onOpenChange={handleOpenChange}
                onSubmit={selectedRole ? handleUpdateRole : handleCreateRole}
                role={selectedRole}
                permissions={permissions}
            />
        </div>
    );
}