import type { ReactNode } from "react";
import CardWrapper from "@/components/ui/CardWrapper";

export interface StatsCardProps {
  title: string;
  value: string | number;
  delta?: string;
  subtitle?: ReactNode;
}

export default function StatsCard({
  title,
  value,
  delta,
  subtitle,
}: StatsCardProps) {
  return (
    <CardWrapper className="flex flex-col gap-2.5">
      <p className="font-sans text-sm font-medium text-black">{title}</p>
      <div className="flex flex-col gap-1">
        <p className="font-sans text-3xl font-semibold text-black">{value}</p>
        {(delta || subtitle) && (
          <p className="font-sans text-xs font-medium">
            {delta && <span className="text-primary-500">{delta}</span>}
            {delta && subtitle && " "}
            {subtitle && !delta && subtitle}
            {subtitle && delta && (
              <span className="text-neutral-600">{subtitle}</span>
            )}
          </p>
        )}
      </div>
    </CardWrapper>
  );
}
