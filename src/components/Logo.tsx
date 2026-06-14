interface LogoProps {
  companyName?: string;
}

export default function Logo({ companyName = "Company Name" }: LogoProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex shrink-0 items-center justify-center rounded-lg bg-primary-500 size-8">
        <img src="/bolt.svg" alt="" className="size-4.5" />
      </div>
      <span className="whitespace-nowrap font-sans text-lg font-medium text-black">
        {companyName}
      </span>
    </div>
  );
}
