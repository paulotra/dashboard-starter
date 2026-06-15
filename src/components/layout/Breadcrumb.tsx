import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1">
          {idx > 0 && (
            <ChevronRight size={14} className="shrink-0 text-neutral-600" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="font-sans text-xs font-medium text-neutral-800 hover:text-primary-500 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-sans text-xs font-medium text-neutral-800">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
