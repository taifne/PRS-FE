import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Role, CreateRoleDto } from '../type/user-role.type';
import { axiosClient } from '../lib/axios/axios-client';

export const useAllRoles = () => {
  return useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: async () => {
      const res = await axiosClient.get('/administration/roles');
      console.log("c", res.data)
      return res.data.data;
    },
  });
};

export const useRole = (id: string) => {
  return useQuery<Role>({
    queryKey: ['roles', id],
    queryFn: async () => {
      const res = await axiosClient.get(`/administration/roles/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleDto) => axiosClient.post('/administration/roles', data),
    onSuccess: () => queryClient.invalidateQueries(['roles']),
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axiosClient.delete(`/roles/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['roles']),
  });
};

export const useUpdateMenusInRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      roleId,
      menuIds,
    }: {
      roleId: string;
      menuIds: string[];
    }) =>
      axiosClient.patch(`/roles/${roleId}/menus`, { menuIds }),
    onSuccess: () => queryClient.invalidateQueries(['roles']),
  });
};