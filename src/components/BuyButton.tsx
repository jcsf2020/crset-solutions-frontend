import Link from "next/link";

type Props = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function BuyButton({ href, label, variant = "primary", className = "" }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
      : "border border-blue-600 text-blue-700 hover:bg-blue-50 focus:ring-blue-500";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {label}
    </Link>
  );
}
