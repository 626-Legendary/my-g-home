// src/components/StockNewsCard.tsx
import React from "react";

type ThumbnailResolution = {
  url: string;
  width: number;
  height: number;
  tag?: string;
};

type StockNewsItem = {
  id: string;
  content: {
    title: string;
    summary?: string;
    pubDate?: string;
    provider?: {
      displayName?: string;
      url?: string;
    };
    thumbnail?: {
      originalUrl?: string;
      resolutions?: ThumbnailResolution[];
    };
    canonicalUrl?: {
      url?: string;
    };
    clickThroughUrl?: {
      url?: string;
    } | null;
    previewUrl?: string | null;
  };
};

type StockNewsCardProps = {
  news: StockNewsItem;
};

const StockNewsCard: React.FC<StockNewsCardProps> = ({ news }) => {
  const c = news.content;
  const title = c.title;
  const summary = c.summary || "";
  const providerName = c.provider?.displayName || "";
  const pubDate = c.pubDate
    ? new Date(c.pubDate).toLocaleString()
    : "";

  const thumbResolution =
    c.thumbnail?.resolutions?.find((r: ThumbnailResolution) => r.tag === "170x128") ||
    (c.thumbnail?.originalUrl
      ? {
          url: c.thumbnail.originalUrl,
          width: 170,
          height: 128,
          tag: "original",
        }
      : null);

  const link =
    c.clickThroughUrl?.url || c.canonicalUrl?.url || c.previewUrl || "#";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 border border-slate-200 rounded-xl p-4 mb-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-shadow bg-white"
    >
      {/* 左侧 文本 */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
          {providerName && <span>{providerName}</span>}
          {providerName && pubDate && <span>·</span>}
          {pubDate && <span>{pubDate}</span>}
        </div>
        {summary && (
          <p className="mt-4 text-xs text-slate-600 line-clamp-2">
            {summary}
          </p>
        )}
      </div>

      {/* 右侧 图片 */}
      {thumbResolution && (
        <div className="flex-shrink-0">
          <img
            src={thumbResolution.url}
            alt={title}
            className="h-20 w-28 rounded-lg object-cover bg-slate-100"
          />
        </div>
      )}
    </a>
  );
};

export default StockNewsCard;
