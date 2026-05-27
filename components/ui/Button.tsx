import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "red" | "blue";
};

export function Button({ variant = "ghost", className = "", children, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-40";
  const variants = {
    primary: "bg-text text-bg hover:bg-muted",
    ghost: "border border-border text-text hover:border-muted hover:bg-surface",
    red: "border border-accentRed/50 text-accentRed hover:bg-accentRed/10",
    blue: "border border-accentBlue/50 text-accentBlue hover:bg-accentBlue/10",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
