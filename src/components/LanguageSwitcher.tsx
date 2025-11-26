'use client';

import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Detect current locale from pathname
  const currentLocale = pathname?.startsWith('/en') ? 'en' : 'pt';

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    let newPathname: string | null;
    
    // Route mapping between PT and EN
    const ptToEnMap: Record<string, string> = {
      '/': '/en',
      '/servicos': '/en/services',
      '/precos': '/en/pricing',
      '/centro-de-ajuda': '/en/help',
      '/faq': '/en/help',
      '/contacto': '/en/contact',
      '/rag-demo': '/en/rag-demo',
    };

    const enToPtMap: Record<string, string> = {
      '/en': '/',
      '/en/services': '/servicos',
      '/en/pricing': '/precos',
      '/en/help': '/centro-de-ajuda',
      '/en/contact': '/contacto',
      '/en/rag-demo': '/rag-demo',
    };
    
    if (newLocale === 'en') {
      // Switch to English
      newPathname = ptToEnMap[pathname || '/'] || '/en';
    } else {
      // Switch to Portuguese
      newPathname = enToPtMap[pathname || '/en'] || '/';
    }

    router.push(newPathname || '/');
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors"
        aria-label="Select language"
      >
        <option value="pt">🇵🇹 Português</option>
        <option value="en">🇬🇧 English</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
