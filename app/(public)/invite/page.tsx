"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2, Users, Building2 } from "lucide-react";
import { userService, type InviteTokenData } from "@/features/users";

type PageState =
  | "loading"
  | "valid"
  | "invalid"
  | "accepting"
  | "success"
  | "error";

export default function InvitePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [state, setState] = useState<PageState>("loading");
  const [inviteData, setInviteData] = useState<InviteTokenData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      setErrorMessage("Token undangan tidak ditemukan.");
      return;
    }

    const fetchInviteData = async () => {
      try {
        const data = await userService.getInviteByToken(token);
        setInviteData(data);
        setState("valid");
      } catch (err) {
        setState("invalid");
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "Undangan tidak valid atau sudah kadaluarsa.",
        );
      }
    };

    fetchInviteData();
  }, [token]);

  const handleAccept = async () => {
    if (!token) return;

    setState("accepting");
    try {
      await userService.acceptInvite(token);
      setState("success");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Gagal menerima undangan.",
      );
    }
  };

  const handleDecline = () => {
    router.push("/");
  };

  // Loading State
  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-600">Memuat undangan...</p>
        </div>
      </div>
    );
  }

  // Invalid State
  if (state === "invalid") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mt-6">
            Undangan Tidak Valid
          </h1>
          <p className="text-gray-600 mt-2">{errorMessage}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // Success State
  if (state === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mt-6">
            Undangan Diterima!
          </h1>
          <p className="text-gray-600 mt-2">
            Anda telah bergabung dengan tim. Mengarahkan ke halaman login...
          </p>
          <div className="mt-6">
            <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (state === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mt-6">
            Gagal Menerima Undangan
          </h1>
          <p className="text-gray-600 mt-2">{errorMessage}</p>
          <button
            onClick={() => setState("valid")}
            className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // Valid State - Show Invitation
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mt-6">Undangan Tim</h1>
          <p className="text-gray-600 mt-2">
            Anda diundang untuk bergabung dengan tim
          </p>
        </div>

        {/* Invite Details */}
        {inviteData && (
          <div className="mt-8 space-y-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">
                    Bisnis
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {inviteData.tenantName}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase font-medium">
                  Diundang oleh
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {inviteData.inviterName}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase font-medium">
                  Role
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1 capitalize">
                  {inviteData.role}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase font-medium">
                Email
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {inviteData.email}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={handleDecline}
            className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Tolak
          </button>
          <button
            onClick={handleAccept}
            disabled={state === "accepting"}
            className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {state === "accepting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Menerima...
              </>
            ) : (
              "Terima Undangan"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
