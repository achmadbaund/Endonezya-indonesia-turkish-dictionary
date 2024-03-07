import { Html, Head, Main, NextScript } from "next/document";
// import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
// import Menu from '@/components/components';

// const inter = Inter({ subsets: ['latin'] });

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        {/* <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem] bg-[url('/public/img/beams-components.png')] bg-[length:1000px_700px] bg-[position:calc(50%_+_190px)_-50px] bg-no-repeat lg:block"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9089fc] to-[#fff] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div> */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* <Container/> */}
          <Main />
          <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  );
}
