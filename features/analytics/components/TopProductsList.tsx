import type { TopProductItem } from "../types/analytics.types";
import { Package } from "lucide-react";

interface TopProductsListProps {
  data: TopProductItem[] | null;
  loading?: boolean;
}

export function TopProductsList({
  data,
  loading = false,
}: TopProductsListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Produk Terlaris
        </h3>
        <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-xl">
          <Package className="w-12 h-12 text-gray-300 mb-2" />
          <p className="text-gray-500">Belum ada data produk</p>
        </div>
      </div>
    );
  }

  // Find max for percentage bar
  const maxQuantity = Math.max(...data.map((p) => p.quantitySold));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Produk Terlaris
      </h3>

      <div className="space-y-4">
        {data.map((product, index) => {
          const percentage = (product.quantitySold / maxQuantity) * 100;

          return (
            <div key={product.productId} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-xs font-bold text-gray-600">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {product.quantitySold} terjual
                </span>
              </div>
              <div className="ml-9 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="ml-9 mt-1 text-xs text-gray-400">
                Rp {product.revenue.toLocaleString("id-ID")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
