import { Menu } from "./menu.type";

export interface User {
  _id: string;
  username: string;
  email: string;
  role?: Role;
  isActive: boolean;
  displayName: string;
  startDate?: string;
  phone?: string;
  address?: string;
  createdBy: string;
  updatedBy?: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
  role?: string;
  displayName?: string;
  startDate?: string;
  phone?: string;
  address?: string;
  createdBy?: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
  displayName?: string;
  startDate?: string;
  phone?: string;
  address?: string;
  updatedBy?: string;
}

export interface UpdateUserRoleDto {
  roleId: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  menus?: Menu[];
}

export interface CreateRoleDto {
  name: string;
  description?: string;
}

export interface AddMenuToRoleDto {
  menuId: string;
}
