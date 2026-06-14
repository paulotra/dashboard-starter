export interface StatsCardProps {
  title: string;
  value: string | number;
  delta?: string;
  subtitle?: string;
}

export default function StatsCard({
  title,
  value,
  delta,
  subtitle,
}: StatsCardProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl bg-white p-4">
      <p className="font-sans text-sm font-medium text-black">{title}</p>
      <div className="flex flex-col gap-1">
        <p className="font-sans text-3xl font-semibold text-black">{value}</p>
        {(delta || subtitle) && (
          <p className="font-sans text-xs font-medium">
            {delta && (
              <span className="text-primary-500">{delta}</span>
            )}
            {delta && subtitle && " "}
            {subtitle && (
              <span className="text-neutral-600">{subtitle}</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
