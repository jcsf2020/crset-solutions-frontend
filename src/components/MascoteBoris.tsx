import Image from "next/image";

export default function MascoteBoris() {
  return (
    <Image
      src="/mascotes/Boris.png"
      alt="Mascote Boris"
      width={300}
      height={300}
      priority
    />
  );
}
