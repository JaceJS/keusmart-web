import type { TopProductItem } from "../types/analytics.types";
import { Card } from "@/app/components/ui/Card";
import { Package } from "lucide-react";
import Link from "next/link";

interface TopProductsListProps {
  data: TopProductItem[] | null;
  loading?: boolean;
}

function StockBadge({ quantity }: { quantity: number }) {
  if (quantity > 100) {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
        Aman
      </span>
    );
  }
  if (quantity > 20) {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
        Sisa Sedikit
      </span>
    );
  }
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
      Hampir Habis
    </span>
  );
}

export function TopProductsList({
  data,
  loading = false,
}: TopProductsListProps) {
  if (loading) {
    return (
      <Card className="p-4 h-full flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/6" />
              <div className="h-4 bg-gray-200 rounded w-1/6" />
              <div className="h-4 bg-gray-200 rounded w-1/6" />
              <div className="h-4 bg-gray-200 rounded w-1/6" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-4 h-full flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <h3 className="font-semibold text-gray-900 text-sm">
            Daftar Produk Terlaris
          </h3>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg min-h-0">
          <Package className="w-8 h-8 text-gray-300 mb-2" />
          <p className="text-xs text-gray-500">Belum ada data produk</p>
        </div>
      </Card>
    );
  }

  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(1)}Jt`;
    }
    if (value >= 1000) {
      return `Rp ${(value / 1000).toFixed(0)}Rb`;
    }
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  return (
    <Card className="p-4 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <h3 className="font-semibold text-gray-900 text-sm">
          Daftar Produk Terlaris
        </h3>
        <Link href="/products" className="text-xs text-primary hover:underline">
          Lihat Semua
        </Link>
      </div>

      <div className="overflow-auto flex-1 min-h-0">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
              <th className="pb-3 font-medium">PRODUK</th>
              <th className="pb-3 font-medium">KATEGORI</th>
              <th className="pb-3 font-medium text-right">TERJUAL</th>
              <th className="pb-3 font-medium text-center">STATUS STOK</th>
              <th className="pb-3 font-medium text-right">REVENUE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((product) => (
              <tr key={product.productId} className="hover:bg-gray-50">
                <td className="py-3">
                  <span className="font-medium text-gray-900">
                    {product.name}
                  </span>
                </td>
                <td className="py-3">
                  <span className="text-sm text-gray-500">
                    {product.category || "-"}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <span className="text-sm text-gray-900">
                    {product.quantitySold} unit
                  </span>
                </td>
                <td className="py-3 text-center">
                  <StockBadge quantity={product.stockRemaining || 100} />
                </td>
                <td className="py-3 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(product.revenue)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
