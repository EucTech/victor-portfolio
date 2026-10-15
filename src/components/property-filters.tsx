"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { properties, propertyFilters } from "@/data/properties";
import { PropertyCard } from "./property-card";
import { cn } from "@/lib/utils";

const bedroomOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];

export function PropertyFilters() {
  const [status, setStatus] = useState("Any");
  const [location, setLocation] = useState("Any");
  const [type, setType] = useState("Any");
  const [beds, setBeds] = useState("Any");

  const results = useMemo(() => {
    const minBeds = beds === "Any" ? 0 : parseInt(beds);
    return properties.filter(
      (p) =>
        (status === "Any" || p.status === status) &&
        (location === "Any" || p.location === location) &&
        (type === "Any" || p.type === type) &&
        (minBeds === 0 || p.bedrooms >= minBeds),
    );
  }, [status, location, type, beds]);

  const active = status !== "Any" || location !== "Any" || type !== "Any" || beds !== "Any";

  function reset() {
    setStatus("Any");
    setLocation("Any");
    setType("Any");
    setBeds("Any");
  }

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-[1.75rem] border border-line bg-white p-5 md:p-7">
        <PillGroup
          id="status"
          label="Looking to"
          value={status}
          onChange={setStatus}
          options={["Any", ...propertyFilters.statuses]}
          display={(o) => (o === "Any" ? "Everything" : o)}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <PillGroup
            id="location"
            label="Neighborhood"
            value={location}
            onChange={setLocation}
            options={["Any", ...propertyFilters.locations]}
          />
          <PillGroup
            id="type"
            label="Type"
            value={type}
            onChange={setType}
            options={["Any", ...propertyFilters.types]}
          />
          <PillGroup id="beds" label="Bedrooms" value={beds} onChange={setBeds} options={bedroomOptions} />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-[0.8125rem] text-muted" aria-live="polite">
          Showing <span className="text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "property" : "properties"}
        </p>
        {active ? (
          <button
            onClick={reset}
            className="text-[0.75rem] uppercase tracking-[0.16em] text-ink underline underline-offset-4"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <LayoutGroup>
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {results.length === 0 ? (
        <div className="mt-8 rounded-[1.75rem] border border-line px-6 py-20 text-center">
          <p className="font-display text-[2rem] text-ink">No properties match those filters</p>
          <p className="mx-auto mt-3 max-w-md text-[0.9375rem] text-muted">
            Try widening your search. I also have listings that never reach the website.
            Tell me what you&apos;re looking for and I&apos;ll send options.
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-full bg-ink px-6 py-3 text-[0.75rem] uppercase tracking-[0.16em] text-white"
          >
            Clear filters
          </button>
        </div>
      ) : null}
    </div>
  );
}

function PillGroup({
  id,
  label,
  value,
  onChange,
  options,
  display = (o) => o,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  display?: (o: string) => string;
}) {
  return (
    <div role="radiogroup" aria-label={label}>
      <p className="mb-3 text-[0.6875rem] uppercase tracking-[0.16em] text-muted">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const selected = value === o;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(o)}
              className={cn(
                "relative rounded-full border px-4 py-2 text-[0.8125rem] transition-colors duration-300",
                selected ? "border-ink text-white" : "border-line text-ink-soft hover:border-ink/40",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId={`pill-${id}`}
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-ink"
                />
              ) : null}
              <span className="relative">{display(o)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
