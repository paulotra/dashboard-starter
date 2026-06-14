import type { ButtonHTMLAttributes, ReactNode } from "react";

const VARIANT_CONFIG = {
  secondary: {
    container: "bg-btn-secondary-bg border border-neutral-400",
    text: "text-black",
  },
  primary: {
    container: "bg-btn-primary-bg",
    text: "text-primary-500",
  },
  "primary-filled": {
    container: "bg-btn-primary-bg-filled",
    text: "text-white",
  },
  danger: {
    container: "bg-red-100",
    text: "text-red-500",
  },
  "danger-filled": {
    container: "bg-red-500",
    text: "text-white",
  },
} as const;

export type ButtonVariant = keyof typeof VARIANT_CONFIG;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
}

export default function Button({
  variant = "secondary",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const { container, text } = VARIANT_CONFIG[variant];
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 ${container} ${text} ${className ?? ""}`}
      {...props}
    >
      {icon && <span className="shrink-0 size-3.5">{icon}</span>}
      <span className="whitespace-nowrap font-sans text-sm font-normal">
        {children}
      </span>
    </button>
  );
}

export function ExportIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 11 12" fill="none">
      <path
        d="M5.17 0.5V8.08M8.08 5.17L5.17 8.08L2.25 5.17M0.5 11H9.83"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 11 12" fill="none">
      <path
        d="M4.58 1.67V0.5H5.75V1.67M0.5 2.25H9.83M1.67 2.83V11H8.67V2.83"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 2.33V11.67M2.33 7H11.67"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}
