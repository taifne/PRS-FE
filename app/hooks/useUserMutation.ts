import { useQuery, useMutation, useQueryClient } from 'react-query';
import { User, CreateUserDto, UpdateUserDto, UpdateUserRoleDto } from '../type/user-role.type';
import { Paginated } from '../type/pagination';
import { SearchUserRequest } from '../type/user.type';
import { buildParams } from '../utils/buildParams';
import axiosClient from '../lib/axios';

const USER_API = '/administration/users';

export const useLazyUsers = (filters: SearchUserRequest) => {
  const queryString = buildParams(filters);

  return useQuery<Paginated<User>>({
    queryKey: ['users', filters],
    queryFn: async () => {
      const res = await axiosClient.get<Paginated<User>>(
        `${USER_API}/search?${queryString}`
      );
      return res.data;
    },
    enabled: false,
  });
};

export const useAllUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosClient.get(USER_API);
      return res.data;
    },
  });
};

export const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await axiosClient.get(`${USER_API}/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserDto) =>
      axiosClient.post(USER_API, data),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      axiosClient.put(`${USER_API}/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      axiosClient.delete(`${USER_API}/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) =>
      axiosClient.patch(`${USER_API}/${userId}/role`, {
        roleId,
      } as UpdateUserRoleDto),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

export const useDeleteUsersBulk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userIds: string[]) =>
      axiosClient.delete(`${USER_API}/bulk`, {
        data: { userIds },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};