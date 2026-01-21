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
  role: "admin" | "staff";
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
