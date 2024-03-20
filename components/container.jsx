import Head from 'next/head';
import Footer from '@/components/footer';

export default function Container(props) {
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
      <main>
        {children}
        <Footer />
      </main>
    </div>
  );
}