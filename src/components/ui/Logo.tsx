import { Zap } from "lucide-react";

interface LogoProps {
  companyName?: string;
}

export default function Logo({ companyName = "Company Name" }: LogoProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex shrink-0 items-center justify-center rounded-lg bg-primary-500 size-8">
        <Zap size={18} className="text-white" />
      </div>
      <span className="whitespace-nowrap font-sans text-lg font-medium text-black">
        {companyName}
      </span>
    </div>
  );
}
