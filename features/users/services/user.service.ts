import { apiClient, ApiResponse, PaginatedResponse } from "@/core/api/client";
import type {
  UserParams,
  InviteMemberRequest,
  UpdateMemberRoleRequest,
  TeamMember,
} from "../types/user.types";
import { USER_ENDPOINTS } from "../users.endpoints";

export const userService = {
  getUsers: async (
    params: UserParams = {},
  ): Promise<PaginatedResponse<TeamMember>> => {
    const response = await apiClient.get<ApiResponse<TeamMember[]>>(
      USER_ENDPOINTS.LIST,
      { params },
    );
    return {
      data: response.data || [],
      meta: response.meta || { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  },

  inviteMember: async (data: InviteMemberRequest): Promise<TeamMember> => {
    const response = await apiClient.post<ApiResponse<TeamMember>>(
      USER_ENDPOINTS.INVITE,
      data,
    );
    return response.data;
  },

  updateMemberRole: async (
    id: string,
    data: UpdateMemberRoleRequest,
  ): Promise<TeamMember> => {
    const response = await apiClient.patch<ApiResponse<TeamMember>>(
      `${USER_ENDPOINTS.UPDATE}/${id}`,
      data,
    );
    return response.data;
  },

  removeMember: async (id: string): Promise<void> => {
    await apiClient.delete(`${USER_ENDPOINTS.DELETE}/${id}`);
  },
};
