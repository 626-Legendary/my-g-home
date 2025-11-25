// src/pages/Stock.tsx 或 app/stock/page.tsx
import React, { useEffect, useState } from "react";
import StockCard from "../components/StockCard";
import StockNewsCard from "../components/StockNewsCard";

const API_BASE = import.meta.env.VITE_API_BASE;

// 后端返回结构
export type StockNewsItem = {
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
            resolutions?: { url: string; width: number; height: number; tag: string }[];
        };
        canonicalUrl?: {
            url?: string;
        };
        clickThroughUrl?: {
            url?: string;
        } | null;
    };
};

type StockDetail = {
    symbol: string;
    displayName?: string;
    info: {
        lastPrice?: number;
        previousClose?: number;
        dayHigh?: number;
        dayLow?: number;
        yearHigh?: number;
        yearLow?: number;
        currency?: string;
    };
    news?: StockNewsItem[];
};

const SYMBOLS = import.meta.env.VITE_SYMBOLS.split(",");
// ["NBIS", "RXRX", "RKLB"];

const Stock: React.FC = () => {
    const [stocks, setStocks] = useState<StockDetail[]>([]);
    const [newsItems, setNewsItems] = useState<StockNewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStock = async (symbol: string): Promise<StockDetail | null> => {
            try {
                const res = await fetch(`${API_BASE}/api/stocks/${symbol}`);
                if (!res.ok) {
                    console.warn(`Failed to fetch ${symbol}`);
                    return null;
                }
                const data = (await res.json()) as StockDetail;
                return data;
            } catch (err) {
                console.error(`Error fetching ${symbol}`, err);
                return null;
            }
        };

        const loadAllStocks = async () => {
            try {
                setLoading(true);
                setError(null);

                const results = await Promise.all(SYMBOLS.map(fetchStock));
                const valid = results.filter((s): s is StockDetail => s !== null);

                setStocks(valid);

                // 把所有股票的 news 摊平，按时间倒序
                const allNews = valid
                    .flatMap((s) => (s.news ? s.news.slice(0, 4) : []))
                    .sort((a, b) => {
                        const da = a.content.pubDate ? Date.parse(a.content.pubDate) : 0;
                        const db = b.content.pubDate ? Date.parse(b.content.pubDate) : 0;
                        return db - da;
                    });

                setNewsItems(allNews);
            } catch (err) {
                console.error(err);
                setError("无法加载股票数据");
            } finally {
                setLoading(false);
            }
        };

        loadAllStocks();
    }, []);

    return (
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto px-4 py-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">My Stocks</h2>

                {loading && <div className="text-sm text-slate-500">Loading...</div>}
                {error && <div className="text-sm text-red-500">{error}</div>}

                {!loading && !error && (
                    <div className="grid gap-4 md:grid-cols-2">
                        {stocks.map((s) => {
                            const price = s.info.lastPrice || 0;
                            const prev = s.info.previousClose || 0;
                            const change = price - prev;
                            const percent = prev ? (change / prev) * 100 : 0;

                            return (
                                <StockCard
                                    key={s.symbol}
                                    symbol={s.symbol}
                                    name={s.displayName || s.symbol}
                                    price={price}
                                    change={change}
                                    changePercent={percent}
                                />
                            );
                        })}
                    </div>
                )}

                {/* 新闻区 */}
                <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">
                    Recent News
                </h2>
                {!loading && !error && newsItems.length === 0 && (
                    <div className="text-sm text-slate-500">No recent news.</div>
                )}

                <div className="space-y-3">
                    {newsItems.map((n) => (
                        <StockNewsCard key={n.id} news={n} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Stock;
