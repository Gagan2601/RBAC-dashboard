import { Permission, Role, User } from "@/types";

export const mockPermissions: Permission[] = [
  {
    id: "1",
    name: "Read Users",
    description: "Can view user details",
    resource: "users",
    action: "read",
  },
  {
    id: "2",
    name: "Manage Users",
    description: "Can create, update and delete users",
    resource: "users",
    action: "manage",
  },
  {
    id: "3",
    name: "Read Roles",
    description: "Can view role details",
    resource: "roles",
    action: "read",
  },
  {
    id: "4",
    name: "Manage Roles",
    description: "Can create, update and delete roles",
    resource: "roles",
    action: "manage",
  },
];

export const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access",
    permissions: mockPermissions,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "User Manager",
    description: "Can manage users",
    permissions: [mockPermissions[0], mockPermissions[1]],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    roles: [mockRoles[0]],
    status: "active",
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    email: "manager@example.com",
    name: "User Manager",
    roles: [mockRoles[1]],
    status: "active",
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
