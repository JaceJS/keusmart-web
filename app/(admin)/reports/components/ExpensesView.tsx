import { useExpenses, ExpenseReportTable } from "@/features/expenses";
import type { Period } from "@/app/components/ui/PeriodSelector";

interface ExpensesViewProps {
  period: Period;
}

export function ExpensesView({ period }: ExpensesViewProps) {
  const { data, isLoading } = useExpenses({
    period,
    page: 1,
    limit: 100,
  });

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExpenseReportTable data={data} isLoading={isLoading} />
    </div>
  );
}
