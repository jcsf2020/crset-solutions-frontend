'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="container-pro flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">CRSET</Link>
        <button onClick={() => setOpen(!open)} className="sm:hidden">Menu</button>
      </div>
    </header>
  );
}
