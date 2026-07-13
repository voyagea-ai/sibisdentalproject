"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { treatments, treatmentCategories, type TreatmentCategory } from "@/content/treatments";
import { TreatmentCard } from "./TreatmentCard";

export function TreatmentDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TreatmentCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return treatments.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesQuery =
        q === "" ||
        t.title.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search treatments…"
            aria-label="Search treatments"
            className="w-full rounded-full border border-hair-dark bg-white/60 py-3 pl-11 pr-4 text-sm text-charcoal outline-none transition focus:border-champagne focus:ring-2 focus:ring-champagne/30"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {(["All", ...treatmentCategories] as const).map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat as TreatmentCategory | "All")}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-charcoal bg-charcoal text-text-light"
                    : "border-hair-dark text-charcoal hover:border-champagne"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {filtered.length} treatment{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TreatmentCard key={t.slug} treatment={t} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-hair-dark p-10 text-center text-muted">
          No treatments match your search. Try a different term or clear the filters.
        </p>
      )}
    </div>
  );
}
