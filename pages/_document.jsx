import { Html, Head, Main, NextScript } from "next/document";
// import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import Container from '../components/Container';
// import Menu from '@/components/components';

// const inter = Inter({ subsets: ['latin'] });

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* <Container/> */}
          <Main />
          <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  );
}
