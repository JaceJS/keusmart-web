import { DashboardLayout } from "@/app/components/DashboardLayout";
import { AuthProvider } from "@/features/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthProvider>
  );
}
