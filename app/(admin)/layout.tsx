import { DashboardLayout } from "@/app/components/DashboardLayout";
import { AuthProvider } from "@/features/auth";
import { RouteGuard } from "@/features/auth/components/RouteGuard";
import { ToastProvider } from "@/app/components/ui/Toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <RouteGuard>
          <DashboardLayout>{children}</DashboardLayout>
        </RouteGuard>
      </ToastProvider>
    </AuthProvider>
  );
}
