import { DashboardLayout } from "@/app/components/DashboardLayout";
import { PlanProvider } from "@/features/plans";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PlanProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </PlanProvider>
  );
}
