import { Helmet } from 'react-helmet-async';
import seoData from '../data/seo.json';

type PageKey = keyof typeof seoData.pages;

interface SeoProps {
  page: PageKey;
}

export function Seo({ page }: SeoProps) {
  const { site } = seoData;
  const meta = seoData.pages[page];
  const canonicalUrl = page === 'home' ? site.url : `${site.url}/#/${page}`;
  const ogImageUrl = `${site.url}${meta.ogImage}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content={site.locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.twitterHandle} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
}
