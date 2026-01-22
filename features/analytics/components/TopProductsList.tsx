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
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm animate-pulse h-full">
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
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm h-full flex flex-col">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Produk Terlaris
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center bg-secondary rounded-xl min-h-64">
          <Package className="w-12 h-12 text-text-tertiary mb-2" />
          <p className="text-text-secondary">Belum ada data produk</p>
        </div>
      </div>
    );
  }

  // Find max for percentage bar
  const maxQuantity = Math.max(...data.map((p) => p.quantitySold));

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Produk Terlaris
      </h3>

      <div className="flex-1 space-y-4">
        {data.map((product, index) => {
          const percentage = (product.quantitySold / maxQuantity) * 100;

          return (
            <div key={product.productId} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-primary-light rounded text-xs font-bold text-primary-dark">
                    {index + 1}
                  </span>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </span>
                </div>
                <span className="text-sm text-text-secondary">
                  {product.quantitySold} terjual
                </span>
              </div>
              <div className="ml-9 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-primary-dark to-primary rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="ml-9 mt-1 text-xs text-text-tertiary">
                Rp {product.revenue.toLocaleString("id-ID")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
