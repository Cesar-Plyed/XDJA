import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useI18n } from '@i18n/useI18n';
import { SITE_URL } from '@lib/site';

export interface SeoOptions {
  title: string;
  description: string;
  noindex?: boolean;
  ogImage?: string;
}

export function useSeo({ title, description, noindex = false, ogImage }: SeoOptions) {
  const { locale } = useI18n();
  const location = useLocation();
  const canonical = `${SITE_URL}${location.pathname}`;
  const image = ogImage ?? `${SITE_URL}/og-image.svg`;
  const robots = noindex ? 'noindex, nofollow' : 'index, follow';
  const ogLocale = locale === 'es' ? 'es_MX' : 'en_US';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="XDJA Construction" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={ogLocale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="alternate" hrefLang="es" href={canonical} />
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
    </Helmet>
  );
}
