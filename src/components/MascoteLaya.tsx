"use client";
import Image from "next/image";

export default function MascoteLaya() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/mascotes/laya.png"
        alt="Laya - Comunicação"
        width={512}
        height={512}
        sizes="(max-width: 640px) 200px, (max-width: 1024px) 256px, 512px"
        placeholder="blur"
        blurDataURL="/mascotes/laya.png"
      />
      <p className="mt-4 text-lg font-semibold">Laya - Comunicação</p>
    </div>
  );
}
