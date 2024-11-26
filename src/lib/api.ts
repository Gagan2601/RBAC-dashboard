import { mockPermissions, mockRoles, mockUsers } from "./mock-data";
import { Permission, Role, User, ApiResponse } from "@/types";

// Utility function to initialize local storage
const initLocalStorage = () => {
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("mockUsers")) {
      localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
    }
    if (!localStorage.getItem("mockRoles")) {
      localStorage.setItem("mockRoles", JSON.stringify(mockRoles));
    }
    if (!localStorage.getItem("mockPermissions")) {
      localStorage.setItem("mockPermissions", JSON.stringify(mockPermissions));
    }
  }
};

// Users API
export const getUsers = async (): Promise<ApiResponse<User[]>> => {
  initLocalStorage();
  const users = JSON.parse(localStorage.getItem("mockUsers") || "[]");
  const parsedUsers = users.map((user: User) => ({
    ...user,
    lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  }));
  return {
    data: parsedUsers,
    success: true,
    message: "Users fetched successfully",
  };
};

export const createUser = async (
  user: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<ApiResponse<User>> => {
  const users = JSON.parse(localStorage.getItem("mockUsers") || "[]");
  const newUser: User = {
    ...user,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(newUser);
  localStorage.setItem("mockUsers", JSON.stringify(users));
  return { data: newUser, success: true, message: "User created successfully" };
};

export const updateUser = async (
  id: string,
  user: Partial<User>
): Promise<ApiResponse<User>> => {
  const users = JSON.parse(localStorage.getItem("mockUsers") || "[]");
  const index = users.findIndex((u: User) => u.id === id);
  if (index === -1) throw new Error("User not found");

  users[index] = {
    ...users[index],
    ...user,
    updatedAt: new Date(),
  };
  localStorage.setItem("mockUsers", JSON.stringify(users));
  return {
    data: users[index],
    success: true,
    message: "User updated successfully",
  };
};

export const deleteUser = async (id: string): Promise<ApiResponse<void>> => {
  let users = JSON.parse(localStorage.getItem("mockUsers") || "[]");
  users = users.filter((u: User) => u.id !== id);
  localStorage.setItem("mockUsers", JSON.stringify(users));
  return {
    data: undefined,
    success: true,
    message: "User deleted successfully",
  };
};

// Roles API with similar local storage logic
export const getRoles = async (): Promise<ApiResponse<Role[]>> => {
  initLocalStorage();
  const roles = JSON.parse(localStorage.getItem("mockRoles") || "[]");
  const parsedRoles = roles.map((role: Role) => ({
    ...role,
    createdAt: new Date(role.createdAt),
    updatedAt: new Date(role.updatedAt),
  }));
  return {
    data: parsedRoles,
    success: true,
    message: "Roles fetched successfully",
  };
};

export const createRole = async (
  role: Omit<Role, "id" | "createdAt" | "updatedAt">
): Promise<ApiResponse<Role>> => {
  const roles = JSON.parse(localStorage.getItem("mockRoles") || "[]");
  const newRole: Role = {
    ...role,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  roles.push(newRole);
  localStorage.setItem("mockRoles", JSON.stringify(roles));
  return { data: newRole, success: true, message: "Role created successfully" };
};

export const updateRole = async (
  id: string,
  role: Partial<Role>
): Promise<ApiResponse<Role>> => {
  const roles = JSON.parse(localStorage.getItem("mockRoles") || "[]");
  const index = roles.findIndex((r: Role) => r.id === id);
  if (index === -1) throw new Error("Role not found");

  roles[index] = {
    ...roles[index],
    ...role,
    updatedAt: new Date(),
  };
  localStorage.setItem("mockRoles", JSON.stringify(roles));
  return {
    data: roles[index],
    success: true,
    message: "Role updated successfully",
  };
};

export const deleteRole = async (id: string): Promise<ApiResponse<void>> => {
  let roles = JSON.parse(localStorage.getItem("mockRoles") || "[]");
  roles = roles.filter((r: Role) => r.id !== id);
  localStorage.setItem("mockRoles", JSON.stringify(roles));
  return {
    data: undefined,
    success: true,
    message: "Role deleted successfully",
  };
};

export const getPermissions = async (): Promise<ApiResponse<Permission[]>> => {
  initLocalStorage();
  const permissions = JSON.parse(
    localStorage.getItem("mockPermissions") || "[]"
  );
  return {
    data: permissions,
    success: true,
    message: "Permissions fetched successfully",
  };
};

export const createPermission = async (
  permission: Omit<Permission, "id">
): Promise<ApiResponse<Permission>> => {
  const permissions = JSON.parse(
    localStorage.getItem("mockPermissions") || "[]"
  );
  const newPermission: Permission = {
    ...permission,
    id: Math.random().toString(36).substr(2, 9),
  };
  permissions.push(newPermission);
  localStorage.setItem("mockPermissions", JSON.stringify(permissions));
  return {
    data: newPermission,
    success: true,
    message: "Permission created successfully",
  };
};

export const updatePermission = async (
  id: string,
  permission: Partial<Permission>
): Promise<ApiResponse<Permission>> => {
  const permissions = JSON.parse(
    localStorage.getItem("mockPermissions") || "[]"
  );
  const index = permissions.findIndex((p: Permission) => p.id === id);
  if (index === -1) throw new Error("Permission not found");

  permissions[index] = { ...permissions[index], ...permission };
  localStorage.setItem("mockPermissions", JSON.stringify(permissions));
  return {
    data: permissions[index],
    success: true,
    message: "Permission updated successfully",
  };
};

export const deletePermission = async (
  id: string
): Promise<ApiResponse<void>> => {
  let permissions = JSON.parse(localStorage.getItem("mockPermissions") || "[]");
  permissions = permissions.filter((p: Permission) => p.id !== id);
  localStorage.setItem("mockPermissions", JSON.stringify(permissions));
  return {
    data: undefined,
    success: true,
    message: "Permission deleted successfully",
  };
};
