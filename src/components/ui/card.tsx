import type { HTMLAttributes, PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

/** Card minimalista para layout */
export function Card({ className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm " +
        className
      }
      {...rest}
    >
      {children}
    </div>
  );
}
