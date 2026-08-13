import React, { useEffect, useState } from "react";
import { List, ChevronRight } from "lucide-react";

export interface TocItem {
  id: string;
  titleEn: string;
  titleNe?: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -60% 0%" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-gray-200 dark:border-slate-800 backdrop-blur-md shadow-xs">
      <div className="flex items-center gap-2 pb-2.5 border-b border-gray-100 dark:border-slate-800">
        <List size={15} className="text-orange-500" />
        <span className="text-xs font-black tracking-wider uppercase text-gray-700 dark:text-gray-300">
          On This Page (यस पाठमा)
        </span>
      </div>

      <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto custom-scrollbar pr-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-start gap-1.5 ${
                isActive
                  ? "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold border-l-2 border-orange-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/50 font-medium"
              }`}
            >
              <ChevronRight
                size={12}
                className={`mt-0.5 shrink-0 transition-transform ${
                  isActive ? "rotate-90 text-orange-500" : "text-gray-400 opacity-60"
                }`}
              />
              <div className="min-w-0">
                <span className="line-clamp-2 leading-snug">{item.titleEn}</span>
                {item.titleNe && (
                  <span className="block text-[11px] text-gray-400 dark:text-gray-500 font-nepali truncate mt-0.5">
                    {item.titleNe}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
