'use client';

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PermissionTable from '@/components/permissions/PermissionTable';
import PermissionDialog from '@/components/permissions/PermissionDialog';
import { Permission } from '@/types';
import { getPermissions, createPermission, updatePermission, deletePermission } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function PermissionsPage() {
    const [loading, setLoading] = useState(true);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedPermission, setSelectedPermission] = useState<Permission | undefined>();
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            setLoading(true);
            const response = await getPermissions();
            setPermissions(response.data);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch permissions',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePermission = async (permissionData: Partial<Permission>) => {
        try {
            await createPermission(permissionData as Omit<Permission, 'id'>);
            toast({ title: 'Success', description: 'Permission created successfully' });
            fetchPermissions();
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to create permission', variant: 'destructive' });
        }
    };

    const handleUpdatePermission = async (permissionData: Partial<Permission>) => {
        if (!selectedPermission) return;
        try {
            await updatePermission(selectedPermission.id, permissionData);
            toast({ title: 'Success', description: 'Permission updated successfully' });
            fetchPermissions();
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to update permission', variant: 'destructive' });
        }
    };

    const handleDeletePermission = async (permissionId: string) => {
        try {
            await deletePermission(permissionId);
            toast({ title: 'Success', description: 'Permission deleted successfully' });
            fetchPermissions();
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to delete permission', variant: 'destructive' });
        }
    };

    const handleEdit = (permission: Permission) => {
        setSelectedPermission(permission);
        setDialogOpen(true);
    };

    const handleOpenChange = (open: boolean) => {
        setDialogOpen(open);
        if (!open) setSelectedPermission(undefined);
    };

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Permissions</h1>
                <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Permission
                </Button>
            </div>
            <PermissionTable
                permissions={permissions}
                onEdit={handleEdit}
                onDelete={handleDeletePermission}
                loading={loading}
            />
            <PermissionDialog
                open={dialogOpen}
                onOpenChange={handleOpenChange}
                onSubmit={selectedPermission ? handleUpdatePermission : handleCreatePermission}
                permission={selectedPermission}
            />
        </div>
    );
}
