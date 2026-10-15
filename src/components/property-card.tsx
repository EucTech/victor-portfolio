import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/lib/utils";
import { Media } from "./ui/media";
import { Tilt } from "./motion/tilt";

export function PropertyCard({ property }: { property: Property }) {
  const p = property;
  const [cover, second] = p.images;

  return (
    <Tilt max={6} className="group">
      <Link
        href={`/properties/${p.slug}`}
        data-cursor="View"
        className="block overflow-hidden rounded-[1.75rem] border border-line bg-white p-2.5 transition-shadow duration-500 group-hover:shadow-[0_30px_60px_rgba(10,10,10,0.1)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
          <Media
            src={cover?.src}
            alt={cover?.alt ?? p.name}
            label="Property photo"
            className="absolute inset-0"
            imageClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {second ? (
            <Image
              src={second.src}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          ) : null}
          <span className="glass absolute left-3 top-3 rounded-full px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-ink">
            {p.status}
          </span>
          <span className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-full bg-white text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </span>
        </div>

        <div className="px-3 pb-3 pt-5">
          <p className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
            <MapPin className="size-3.5 text-gold-deep" strokeWidth={1.5} />
            {p.location}, {p.city}
          </p>
          <h3 className="mt-2 font-display text-[1.625rem] leading-tight text-ink">{p.name}</h3>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-4">
            <p className="font-display text-[1.5rem] leading-none text-ink">
              {formatPrice(p.price, p.currency)}
              {p.priceQualifier ? (
                <span className="ml-1.5 font-sans text-[0.75rem] text-muted">{p.priceQualifier}</span>
              ) : null}
            </p>
            <div className="flex items-center gap-4 text-[0.8125rem] text-muted">
              {p.bedrooms > 0 ? (
                <span className="inline-flex items-center gap-1.5">
                  <BedDouble className="size-4" strokeWidth={1.5} />
                  {p.bedrooms}
                </span>
              ) : null}
              {p.bathrooms > 0 ? (
                <span className="inline-flex items-center gap-1.5">
                  <Bath className="size-4" strokeWidth={1.5} />
                  {p.bathrooms}
                </span>
              ) : null}
              {p.sizeSqm ? (
                <span className="inline-flex items-center gap-1.5">
                  <Maximize className="size-4" strokeWidth={1.5} />
                  {p.sizeSqm} m²
                </span>
              ) : null}
              <span>{p.type}</span>
            </div>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
