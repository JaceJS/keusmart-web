import { useExpenses, ExpenseReportTable } from "@/features/expenses";

interface ExpensesViewProps {
  startDate: string;
  endDate: string;
}

export function ExpensesView({ startDate, endDate }: ExpensesViewProps) {
  const { data, isLoading } = useExpenses({
    startDate,
    endDate,
    page: 1,
    limit: 100,
  });

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ExpenseReportTable data={data} isLoading={isLoading} />
    </div>
  );
}
