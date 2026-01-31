import { DashboardLayout } from "@/app/components/DashboardLayout";
import { AuthProvider } from "@/features/auth";
import { RouteGuard } from "@/features/auth/components/RouteGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RouteGuard>
        <DashboardLayout>{children}</DashboardLayout>
      </RouteGuard>
    </AuthProvider>
  );
}
