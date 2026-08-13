import React, { useState } from "react";
import { KeyTerm } from "@/pages/learn/computerSkillsData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, BookOpen, Sparkles, Filter } from "lucide-react";

interface GlossarySearchProps {
  terms: KeyTerm[];
  title?: string;
}

export const GlossarySearch: React.FC<GlossarySearchProps> = ({
  terms,
  title = "Searchable Computer Terminology Glossary"
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = terms.filter(item => {
    const query = searchTerm.toLowerCase().trim();
    const matchesQuery =
      item.termEn.toLowerCase().includes(query) ||
      item.termNe.toLowerCase().includes(query) ||
      item.definitionEn.toLowerCase().includes(query) ||
      item.definitionNe.toLowerCase().includes(query);

    return matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search term in English or नेपाली (e.g. CPU, RAM, Desktop)..."
            className="pl-12 pr-4 py-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 text-base focus-visible:ring-orange-500 shadow-sm"
          />
        </div>

        <Badge variant="outline" className="self-start sm:self-center font-black text-sm px-4 py-2 border-2 border-orange-500/30 text-orange-600 dark:text-orange-400">
          {filteredTerms.length} of {terms.length} Terms
        </Badge>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTerms.length === 0 ? (
          <div className="col-span-full p-10 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-gray-200 dark:border-slate-800">
            <p className="text-gray-600 dark:text-gray-400 font-bold text-base">No matching terms found for "{searchTerm}".</p>
          </div>
        ) : (
          filteredTerms.map((t, idx) => (
            <Card
              key={idx}
              className="border-2 border-gray-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 hover:border-orange-500 transition-all hover:shadow-lg group"
            >
              <CardContent className="p-0 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                      {t.termEn}
                    </h4>
                    <p className="text-base font-bold text-orange-600 dark:text-orange-400 font-nepali">
                      {t.termNe}
                    </p>
                  </div>
                  <Badge className="text-xs font-black bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 shrink-0">
                    Term #{idx + 1}
                  </Badge>
                </div>

                <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                  {t.definitionEn}
                </p>

                <p className="text-base text-gray-900 dark:text-gray-100 font-nepali leading-relaxed font-semibold pt-2 border-t-2 border-gray-100 dark:border-slate-800">
                  {t.definitionNe}
                </p>

                {t.exampleEn && (
                  <div className="p-4 rounded-2xl bg-orange-50/80 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 text-sm text-gray-800 dark:text-gray-200 space-y-1">
                    <div>
                      <span className="font-black text-orange-600 dark:text-orange-400">Real-World Example: </span>
                      <span className="font-semibold">{t.exampleEn}</span>
                    </div>
                    {t.exampleNe && (
                      <p className="font-nepali text-orange-900 dark:text-orange-200 text-sm font-semibold">
                        ({t.exampleNe})
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
