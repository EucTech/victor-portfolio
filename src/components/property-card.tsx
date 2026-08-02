import Link from "next/link";
import { ArrowUpRight, BedDouble, Bath, Maximize } from "lucide-react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/lib/utils";
import { Media } from "./ui/media";

export function PropertyCard({ property }: { property: Property }) {
  const p = property;
  return (
    <Link href={`/properties/${p.slug}`} className="group block">
      <div className="relative overflow-hidden">
        <Media
          src={p.images[0]}
          alt={p.name}
          label="Property photo"
          className="aspect-[4/3] w-full"
          imageClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute left-4 top-4 bg-white/95 px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-ink">
          {p.status}
        </span>
      </div>

      <div className="pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl leading-snug text-ink transition-colors group-hover:text-gold-deep">
              {p.name}
            </h3>
            <p className="mt-1 text-[0.8125rem] text-muted">
              {p.location}, {p.city}
            </p>
          </div>
          <ArrowUpRight
            className="mt-1 size-4 shrink-0 text-gold-deep opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
            strokeWidth={1.5}
          />
        </div>

        <p className="mt-4 font-display text-lg text-ink">
          {p.priceQualifier ? (
            <span className="mr-1.5 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
              {p.priceQualifier}
            </span>
          ) : null}
          {formatPrice(p.price, p.currency)}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-[0.8125rem] text-muted">
          {p.bedrooms > 0 ? (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="size-3.5" strokeWidth={1.5} />
              {p.bedrooms} bed
            </span>
          ) : null}
          {p.bathrooms > 0 ? (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="size-3.5" strokeWidth={1.5} />
              {p.bathrooms} bath
            </span>
          ) : null}
          {p.sizeSqm ? (
            <span className="inline-flex items-center gap-1.5">
              <Maximize className="size-3.5" strokeWidth={1.5} />
              {p.sizeSqm} m²
            </span>
          ) : p.plotSqm ? (
            <span className="inline-flex items-center gap-1.5">
              <Maximize className="size-3.5" strokeWidth={1.5} />
              {p.plotSqm} m² plot
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
