'use client';
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  size?: number;
};

export default function MascoteCard({ src, alt = "Mascote", className, size = 48 }: Props) {
  return (
    <div className={className} style={{ width: size, height: size, position: "relative" }}>
      <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  );
}
