"use client";

import { useState, useCallback } from "react";
import { UserPlus, Users, AlertCircle } from "lucide-react";
import {
  useUsers,
  TeamMemberList,
  InviteMemberModal,
  userService,
} from "@/features/users";
import { usePlan } from "@/features/plans";
import { cn } from "@/app/lib/utils";

const ITEMS_PER_PAGE = 10;

export default function TeamPage() {
  const { limits, tier } = usePlan();
  const [page, setPage] = useState(1);
  const { data, meta, isLoading, error, fetchUsers, refetch } = useUsers({
    page,
    limit: ITEMS_PER_PAGE,
  });
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isInviting, setIsInviting] = useState(false);

  const currentUserCount = meta?.total ?? data.length;
  const canAddMore = currentUserCount < limits.users;
  const remainingSlots = Math.max(0, limits.users - currentUserCount);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      fetchUsers({ page: newPage, limit: ITEMS_PER_PAGE });
    },
    [fetchUsers],
  );

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

  const getUpgradePlan = () => {
    if (tier === "starter") return "Growth";
    if (tier === "growth") return "Smart";
    return null;
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

        <div className="flex items-center gap-3">
          <div className="text-sm text-text-secondary">
            <span className="font-medium text-gray-900">
              {currentUserCount}
            </span>
            <span className="text-gray-400">/{limits.users}</span>
            <span className="ml-1">anggota</span>
          </div>

          <button
            onClick={() => canAddMore && setIsInviteModalOpen(true)}
            disabled={!canAddMore}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm",
              canAddMore
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-gray-100 text-gray-400 cursor-not-allowed",
            )}
          >
            <UserPlus className="w-4 h-4" />
            {canAddMore ? "Undang Anggota" : "Limit Tercapai"}
          </button>
        </div>
      </div>

      {/* Limit Warning Banner */}
      {!canAddMore && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Batas anggota tercapai
            </p>
            <p className="text-sm text-amber-700 mt-1">
              Anda sudah mencapai batas maksimal {limits.users} anggota untuk
              paket {tier.charAt(0).toUpperCase() + tier.slice(1)}.
              {getUpgradePlan() && (
                <a
                  href="/settings/billing"
                  className="ml-1 font-medium text-amber-800 underline hover:no-underline"
                >
                  Upgrade ke {getUpgradePlan()} untuk menambah lebih banyak →
                </a>
              )}
            </p>
          </div>
        </div>
      )}

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
              {isLoading ? (
                "..."
              ) : (
                <>
                  {currentUserCount}
                  <span className="text-sm font-normal text-gray-400">
                    /{limits.users}
                  </span>
                </>
              )}
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
        meta={meta}
        currentPage={page}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />

      {/* Invite Modal */}
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInvite}
        isLoading={isInviting}
        remainingSlots={remainingSlots}
      />
    </div>
  );
}
