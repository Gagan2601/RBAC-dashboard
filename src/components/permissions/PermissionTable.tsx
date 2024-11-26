import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Permission } from "@/types";

interface PermissionTableProps {
    permissions: Permission[] | null;
    onEdit: (permission: Permission) => void;
    onDelete: (permissionId: string) => void;
    loading: boolean;
}

const PermissionTable = ({
    permissions,
    onEdit,
    onDelete,
    loading,
}: PermissionTableProps) => {
    const skeletonRows = Array.from({ length: 5 });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Resource</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading
                        ? skeletonRows.map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-32" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-20" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-16" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-16" />
                                </TableCell>
                            </TableRow>
                        ))
                        : permissions?.map((permission, index) => (
                            <TableRow
                                key={permission.id}
                                className="opacity-0 animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <TableCell className="font-medium">{permission.name}</TableCell>
                                <TableCell>{permission.description}</TableCell>
                                <TableCell>{permission.resource}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{permission.action}</Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="transition-transform transform origin-top-right scale-95 animate-slide"
                                        >
                                            <DropdownMenuItem onClick={() => onEdit(permission)}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() => onDelete(permission.id)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PermissionTable;
