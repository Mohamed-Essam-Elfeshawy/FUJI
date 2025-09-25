import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  article = null 
}) => {
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next') || 'ar';
  const isRTL = currentLanguageCode === 'ar';

  // Default values
  const defaultTitle = isRTL ? 'FUJI FD - شركة المصاعد الرائدة في المملكة العربية السعودية' : 'FUJI FD - Leading Elevator Company in Saudi Arabia';
  const defaultDescription = isRTL 
    ? 'شركة FUJI FD الرائدة في مجال المصاعد بالمملكة العربية السعودية. نقدم خدمات التركيب والصيانة والتحديث والاستشارات الفنية لجميع أنواع المصاعد. خبرة عالية وجودة مضمونة.'
    : 'FUJI FD is the leading elevator company in Saudi Arabia. We provide installation, maintenance, modernization, and technical consultation services for all types of elevators. High expertise and guaranteed quality.';
  
  const defaultKeywords = isRTL
    ? 'FUJI FD, مصاعد, تركيب مصاعد, صيانة مصاعد, تحديث مصاعد, مصاعد بانورامية, مصاعد بدون تروس, مصاعد الطعام, مصاعد السيارات, المملكة العربية السعودية, جدة, الرياض, الدمام'
    : 'FUJI FD, elevators, elevator installation, elevator maintenance, elevator modernization, panoramic elevators, gearless elevators, food elevators, car lifts, Saudi Arabia, Jeddah, Riyadh, Dammam';

  const siteTitle = title ? `${title} | FUJI FD` : defaultTitle;
  const siteDescription = description || defaultDescription;
  const siteKeywords = keywords || defaultKeywords;
  const siteImage = image || '/fuji-logo.jpg';
  const siteUrl = url || 'https://www.fujifd-ksa.com';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLanguageCode} dir={isRTL ? 'rtl' : 'ltr'} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content="FUJI FD" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#146FB6" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="FUJI FD" />
      <meta property="og:locale" content={isRTL ? 'ar_SA' : 'en_US'} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:site" content="@FUJIFD" />

      {/* Article specific meta tags */}
      {article && (
        <>
          <meta property="article:author" content={article.author} />
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:section" content={article.section} />
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="ar" href={`${siteUrl}?lang=ar`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "FUJI FD",
          "alternateName": isRTL ? "فوجي للمصاعد" : "FUJI Elevators",
          "url": "https://www.fujifd-ksa.com",
          "logo": "https://www.fujifd-ksa.com/fuji-logo.jpg",
          "description": siteDescription,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jeddah",
            "addressCountry": "SA"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966549561015",
            "contactType": "customer service",
            "availableLanguage": ["Arabic", "English"]
          },
          "sameAs": [
            "https://www.facebook.com/FUJIFD",
            "https://www.instagram.com/FUJIFD",
            "https://www.linkedin.com/company/FUJIFD"
          ],
          "serviceArea": {
            "@type": "Country",
            "name": "Saudi Arabia"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Elevator Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": isRTL ? "تركيب المصاعد" : "Elevator Installation"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": isRTL ? "صيانة المصاعد" : "Elevator Maintenance"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": isRTL ? "تحديث المصاعد" : "Elevator Modernization"
                }
              }
            ]
          }
        })}
      </script>

      {/* Additional performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </Helmet>
  );
};

export default SEO;
