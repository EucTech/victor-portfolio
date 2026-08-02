"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { properties, propertyFilters } from "@/data/properties";
import { PropertyCard } from "./property-card";
import { cn } from "@/lib/utils";

const bedroomOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];
const priceOptions = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under $150,000", min: 0, max: 150000 },
  { label: "$150,000 – $300,000", min: 150000, max: 300000 },
  { label: "$300,000 – $500,000", min: 300000, max: 500000 },
  { label: "$500,000+", min: 500000, max: Infinity },
];

const selectClass =
  "h-12 w-full appearance-none border border-line bg-white px-4 pr-9 text-[0.875rem] text-ink transition-colors focus:border-ink focus:outline-none";

export function PropertyFilters() {
  const [location, setLocation] = useState("Any");
  const [type, setType] = useState("Any");
  const [status, setStatus] = useState("Any");
  const [beds, setBeds] = useState("Any");
  const [price, setPrice] = useState(0);

  const results = useMemo(() => {
    const band = priceOptions[price];
    const minBeds = beds === "Any" ? 0 : parseInt(beds);
    return properties.filter(
      (p) =>
        (location === "Any" || p.location === location) &&
        (type === "Any" || p.type === type) &&
        (status === "Any" || p.status === status) &&
        p.bedrooms >= minBeds &&
        p.price >= band.min &&
        p.price <= band.max,
    );
  }, [location, type, status, beds, price]);

  const active =
    location !== "Any" || type !== "Any" || status !== "Any" || beds !== "Any" || price !== 0;

  function reset() {
    setLocation("Any");
    setType("Any");
    setStatus("Any");
    setBeds("Any");
    setPrice(0);
  }

  return (
    <div>
      <div className="border border-line bg-cream p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-gold-deep">
            <SlidersHorizontal className="size-3.5" strokeWidth={1.5} />
            Refine
          </p>
          {active ? (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-[0.75rem] text-muted transition-colors hover:text-ink"
            >
              <X className="size-3" strokeWidth={1.5} />
              Clear all
            </button>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Field label="Location">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={selectClass}
              aria-label="Filter by location"
            >
              <option>Any</option>
              {propertyFilters.locations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </Field>

          <Field label="Property type">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={selectClass}
              aria-label="Filter by property type"
            >
              <option>Any</option>
              {propertyFilters.types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Bedrooms">
            <select
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              className={selectClass}
              aria-label="Filter by bedrooms"
            >
              {bedroomOptions.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>

          <Field label="Price">
            <select
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className={selectClass}
              aria-label="Filter by price"
            >
              {priceOptions.map((o, i) => (
                <option key={o.label} value={i}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={selectClass}
              aria-label="Filter by status"
            >
              <option>Any</option>
              {propertyFilters.statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <p className="mt-8 text-[0.8125rem] text-muted" aria-live="polite">
        Showing {results.length} {results.length === 1 ? "property" : "properties"}
      </p>

      {results.length ? (
        <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-line px-6 py-20 text-center">
          <p className="font-display text-2xl text-ink">No properties match those filters</p>
          <p className="mx-auto mt-3 max-w-md text-[0.9375rem] text-muted">
            Try widening your search. I also have listings that never reach the
            website — tell me what you&apos;re looking for and I&apos;ll send options.
          </p>
          <button
            onClick={reset}
            className="mt-6 text-[0.75rem] uppercase tracking-[0.16em] text-gold-deep underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={cn("mb-2 block text-[0.6875rem] uppercase tracking-[0.14em] text-muted")}>
        {label}
      </span>
      {children}
    </label>
  );
}
