"use client";

import { useState } from "react";
import { UserPlus, Users } from "lucide-react";
import {
  useUsers,
  TeamMemberList,
  InviteMemberModal,
  userService,
} from "@/features/users";

export default function TeamPage() {
  const { data, isLoading, error, refetch } = useUsers();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = async (inviteData: {
    name: string;
    email: string;
    role: "admin" | "staff";
  }) => {
    setIsInviting(true);
    try {
      await userService.inviteMember(inviteData);
      refetch();
    } finally {
      setIsInviting(false);
    }
  };

  const handleRemove = async (member: { id: string; name: string }) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${member.name} dari tim?`)) {
      try {
        await userService.removeMember(member.id);
        refetch();
      } catch (err) {
        console.error("Failed to remove member:", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Tim
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Kelola anggota tim dan hak akses mereka.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          Undang Anggota
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-text-secondary uppercase font-medium">
              Total Anggota
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {isLoading ? "..." : data.length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
            <span className="text-lg">👑</span>
          </div>
          <div>
            <p className="text-xs text-text-secondary uppercase font-medium">
              Admin
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {isLoading
                ? "..."
                : data.filter((m) => m.role === "admin" || m.role === "owner")
                    .length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <span className="text-lg">💼</span>
          </div>
          <div>
            <p className="text-xs text-text-secondary uppercase font-medium">
              Staff
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {isLoading
                ? "..."
                : data.filter((m) => m.role === "staff").length}
            </p>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Team Member List */}
      <TeamMemberList
        data={data}
        isLoading={isLoading}
        onRemove={handleRemove}
      />

      {/* Invite Modal */}
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInvite}
        isLoading={isInviting}
      />
    </div>
  );
}
