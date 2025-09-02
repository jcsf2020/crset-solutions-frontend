import Image from "next/image";

export default function MascoteBoris() {
  return (
    <Image
      src="/mascotes/boris.png"
      alt="Mascote Boris"
      width={300}
      height={300}
      priority
    />
  );
}
