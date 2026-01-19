import { useState, useEffect } from "react";
import { expenseService } from "@/features/expenses";
import type { Expense } from "@/features/expenses";

interface ExpensesViewProps {
  startDate: string;
  endDate: string;
}

export function ExpensesView({ startDate, endDate }: ExpensesViewProps) {
  const [data, setData] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      try {
        const res = await expenseService.getExpenses({
          startDate,
          endDate,
          page: 1,
          limit: 100, // simple list for now
        });
        setData(res?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, [startDate, endDate]);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-border text-xs uppercase text-text-secondary font-semibold">
            <tr>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Nama Pengeluaran</th>
              <th className="px-6 py-4 text-right">Jumlah</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-text-tertiary"
                >
                  Memuat data pengeluaran...
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-text-tertiary"
                >
                  Tidak ada pengeluaran pada periode ini.
                </td>
              </tr>
            ) : (
              data?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-text-secondary">
                    {new Date(item.date).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      Operasional
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-red-600">
                    - Rp {item.amount.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-green-600 font-medium">
                      Lunas
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
