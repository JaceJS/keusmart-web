import { apiClient } from "@/core/api/client";
import type {
  GetUsersResponse,
  UserParams,
  InviteMemberRequest,
  UpdateMemberRoleRequest,
  TeamMember,
} from "../types/user.types";
import { USER_ENDPOINTS } from "../users.endpoints";

export const userService = {
  getUsers: async (params: UserParams = {}): Promise<GetUsersResponse> => {
    return apiClient.get<GetUsersResponse>(USER_ENDPOINTS.LIST, { params });
  },

  inviteMember: async (data: InviteMemberRequest): Promise<TeamMember> => {
    return apiClient.post<TeamMember>(USER_ENDPOINTS.INVITE, data);
  },

  updateMemberRole: async (
    id: string,
    data: UpdateMemberRoleRequest,
  ): Promise<TeamMember> => {
    return apiClient.patch<TeamMember>(`${USER_ENDPOINTS.UPDATE}/${id}`, data);
  },

  removeMember: async (id: string): Promise<void> => {
    return apiClient.delete(`${USER_ENDPOINTS.DELETE}/${id}`);
  },
};
