// src/components/StockCard.tsx
import React from "react";

type StockCardProps = {
  symbol: string;
  name?: string;
  price: number;
  change: number;        // 涨跌额
  changePercent: number; // 涨跌幅（%）
  dataPoints?: number[]; // 用来画 mini sparkline 的数据
};

const StockCard: React.FC<StockCardProps> = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  dataPoints = [],
}) => {
  const isUp = change >= 0;

  // 计算 sparkline polyline 坐标
  const buildSparklinePath = () => {
    if (!dataPoints.length) return "";

    const width = 100;
    const height = 32;
    const max = Math.max(...dataPoints);
    const min = Math.min(...dataPoints);
    const range = max - min || 1;

    return dataPoints
      .map((value, index) => {
        const x =
          dataPoints.length === 1
            ? width / 2
            : (index / (dataPoints.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-slate-900">
              {name || symbol}
            </span>
            {name && (
              <span className="text-xs text-slate-500 truncate max-w-[140px]">
                {symbol}
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-semibold text-slate-900 font-mono tabular-nums">
            ${price.toFixed(2)}
          </div>
          <div
            className={`text-xs font-medium ${
              isUp ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {isUp ? "▲" : "▼"} {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      {/* mini sparkline：你以后有历史数据可以传进来，现在可以先不传 dataPoints */}
      {dataPoints.length > 1 && (
        <div className="mt-2">
          <svg viewBox="0 0 100 32" className="w-full h-8">
            <polyline
              fill="none"
              stroke={isUp ? "#16a34a" : "#ef4444"}
              strokeWidth="1.5"
              points={buildSparklinePath()}
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default StockCard;
