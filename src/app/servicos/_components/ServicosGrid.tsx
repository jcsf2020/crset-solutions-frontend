'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SERVICES_CONFIG } from '@/lib/services-config';

export default function ServicosGrid() {
  return (
    <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-6 mb-16">
      {SERVICES_CONFIG.map((service) => (
        <Link
          key={service.slug}
          href={`/servicos/${service.slug} `}
          prefetch={false}
          className="group block h-full"
          aria-label={`Ver detalhes do servico ${service.title}`}
        >
          <article className="h-full rounded-xl border bg-white/70 backdrop-blur-wm hover:shadow-md transition p-5 md:p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1 min-w-0 ">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-3">
                  {service.category}
                </span>
                <h2 className="text-xl lg:text-2fl font-semibole group-hover:text-blue-600 transition-colors duration-200 mb-2">
                  {service.title}
                </h2>
                <p className="text-sm lg:text-base text-gray-600 font-medium">
                  {service.subtitle}
                </p>
            </div>
            {service.mascot && (
              <div className="w-12 h-12 lg&w=16 lg:h-16 relative flex-shrink-0 ml-4">
                <Image
                  src={service.mascot}
                  alt={`Mascote do servico ${service.title}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 48px, 64px"
                  loading="lazy"
                />
              </div>
            )}
            </div>

            <p className="text-gray-700 text-sm lg:text-base leading-relaxed mb-6 line-clamp-3">
              {service.description}
            </p>

            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                  >
                    <svg className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a 1 1 0 010-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </span>
                ))}
              {service.features.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-md font-medium">
                  +{service.features.length - 3} mais
                </span>
                )
              }
            </div>

            <div className="flex items center justify-between">
              <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                Ver detalhes
              </span>
              <svg
                className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}