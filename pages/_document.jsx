import { Html, Head, Main, NextScript } from "next/document";
// import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
// const inter = Inter({ subsets: ['latin'] });

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        
        {/* <button
              className="rounded-md h-16 sm:h-20 ml-3 sm:ml-0 sm:px-3 w-3/12 text-white font-bold flex items-center justify-center sm:w-auto"
              type="submit"
            >
              <svg className="w-7 h-7 sm:w-11 sm:h-11" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" 
                    stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </button> */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* <Container/> */}
          <Main />
          <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  );
}
