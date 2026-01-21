import type { TeamMember } from "../types/user.types";
import { MoreHorizontal, Mail, Shield, UserMinus } from "lucide-react";
import { useState } from "react";

interface TeamMemberListProps {
  data: TeamMember[];
  isLoading: boolean;
  onEditRole?: (member: TeamMember) => void;
  onRemove?: (member: TeamMember) => void;
}

// Role badge colors
const getRoleBadge = (role: string) => {
  switch (role) {
    case "owner":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "admin":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "staff":
      return "bg-green-50 text-green-700 border-green-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case "owner":
      return "Pemilik";
    case "admin":
      return "Admin";
    case "staff":
      return "Staff";
    default:
      return role;
  }
};

// Status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-50 text-green-700";
    case "pending":
      return "bg-yellow-50 text-yellow-700";
    case "inactive":
      return "bg-gray-50 text-gray-500";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "active":
      return "Aktif";
    case "pending":
      return "Menunggu";
    case "inactive":
      return "Nonaktif";
    default:
      return status;
  }
};

// Avatar placeholder
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function TeamMemberList({
  data,
  isLoading,
  onEditRole,
  onRemove,
}: TeamMemberListProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-border text-xs uppercase text-text-secondary font-semibold">
            <tr>
              <th className="px-6 py-4">Anggota</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-text-tertiary"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Memuat data anggota...
                  </div>
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-text-tertiary"
                >
                  Belum ada anggota tim.
                </td>
              </tr>
            ) : (
              data?.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Avatar + Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-primary/40 flex items-center justify-center text-sm font-semibold text-primary">
                          {getInitials(member.name)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {member.name}
                        </p>
                        {member.phone && (
                          <p className="text-xs text-text-tertiary">
                            {member.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-text-secondary">
                    {member.email}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleBadge(member.role)}`}
                    >
                      <Shield className="w-3 h-3" />
                      {getRoleLabel(member.role)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(member.status)}`}
                    >
                      {getStatusLabel(member.status)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    {member.role !== "owner" && (
                      <div className="relative inline-block">
                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === member.id ? null : member.id,
                            )
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-text-secondary" />
                        </button>

                        {openMenuId === member.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-border py-1 z-20">
                              <button
                                onClick={() => {
                                  onEditRole?.(member);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Shield className="w-4 h-4" />
                                Ubah Role
                              </button>
                              <button
                                onClick={() => {
                                  onRemove?.(member);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <UserMinus className="w-4 h-4" />
                                Hapus dari Tim
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
