"use client";

import { useState } from "react";
import { X, UserPlus, Mail, Shield } from "lucide-react";
import type { InviteMemberRequest } from "../types/user.types";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (data: InviteMemberRequest) => Promise<void>;
  isLoading?: boolean;
}

export function InviteMemberModal({
  isOpen,
  onClose,
  onInvite,
  isLoading = false,
}: InviteMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "cashier">("cashier");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Nama wajib diisi");
      return;
    }
    if (!email.trim()) {
      setError("Email wajib diisi");
      return;
    }

    try {
      await onInvite({ name, email, role });
      // Reset form
      setName("");
      setEmail("");
      setRole("cashier");
      onClose();
    } catch (err) {
      setError("Gagal mengundang anggota. Silakan coba lagi.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Undang Anggota
              </h2>
              <p className="text-sm text-text-secondary">
                Tambahkan anggota baru ke tim Anda
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nama
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full px-4 py-2.5 pl-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@contoh.com"
                className="w-full px-4 py-2.5 pl-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            </div>
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Role
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as "admin" | "cashier")}
                className="w-full px-4 py-2.5 pl-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white"
              >
                <option value="cashier">Kasir - Akses kasir saja</option>
                <option value="admin">Admin - Akses penuh</option>
              </select>
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            </div>
            <p className="text-xs text-text-tertiary mt-1.5">
              {role === "admin"
                ? "Admin dapat mengelola produk, laporan, dan pengaturan."
                : "Kasir hanya dapat melakukan transaksi penjualan."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mengundang...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Undang
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
