import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ModeToggle } from "./ui/theme-toggle";
import { Separator } from "./ui/separator";
// import Footer from '@/components/Footer';

export default function Container(props) {
  const [mounted, setMounted] = useState(false);

  const { children, ...customMeta } = props;
  const meta = {
    title: 'endonezyaevi an Indonesian-Turksih dictionany.',
    description: `Indonesian, Turkish, and Dictionary.`,
    image: 'https://leerob.io/static/images/banner.png',
    type: 'website',
    ...customMeta
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="endonezyaevi an Indonesian-Turksih dictionany" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@leeerob" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <nav className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                
                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button> */}
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              {/* <div className="flex flex-shrink-0 items-center font-extrabold text-1xl text-slate-900 dark:text-white">
                Endonezyaevi
              </div> */}
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button type="button" className="relative rounded-full p-1 text-slate-900 dark:text-white focus:outline-none focus:ring-2">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Share</span>
                <div class="flex w-full gap-2 items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L16.7071 6.29289C17.0976 6.68342 17.0976 7.31658 16.7071 7.70711C16.3166 8.09763 15.6834 8.09763 15.2929 7.70711L13 5.41421V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V5.41421L8.70711 7.70711C8.31658 8.09763 7.68342 8.09763 7.29289 7.70711C6.90237 7.31658 6.90237 6.68342 7.29289 6.29289L11.2929 2.29289ZM4 13C4.55228 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14C3 13.4477 3.44772 13 4 13Z" 
                      fill="currentColor"></path>
                  </svg>
                </div>
              </button>

              <div className="relative ml-3">
                {/* <ModeToggle /> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        {children}
        {/* <Footer /> */}
      </main>
    </div>
  );
}