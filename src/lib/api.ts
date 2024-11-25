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
