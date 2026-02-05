import type { UserRole } from "@/features/auth/types/auth.types";

export interface TeamMember {
  id: string;
  userId: string;
  tenantId: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: "active" | "pending" | "inactive";
  joinedAt: string;
  avatar?: string;
}

export interface InviteMemberRequest {
  email: string;
  name: string;
  role?: "staff"; // Fixed to staff only
}

export interface UpdateMemberRoleRequest {
  role: "admin" | "staff";
}

export interface UserParams {
  [key: string]: string | number | undefined;
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export interface GetUsersResponse {
  data: TeamMember[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface InviteMemberResponse {
  inviteToken: string;
  expiresIn: number;
}

export interface InviteTokenData {
  name: string;
  email: string;
  role: string;
  tenantName: string;
  inviterName: string;
}

export interface AcceptInviteResponse {
  userId: string;
  tenantId: string;
}
