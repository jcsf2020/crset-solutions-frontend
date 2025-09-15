export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export const holoPop = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0)", transition: { duration: 0.35 } },
}

export const marqueeScan = {
  hidden: { maskImage: "linear-gradient(transparent, black 20%, black 80%, transparent)" },
  show: { transition: { staggerChildren: 0.06 } },
}
