import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";

const StructuredData = ({ type = 'organization', data = {} }) => {
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next') || 'ar';
  const isRTL = currentLanguageCode === 'ar';

  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FUJI FD",
    "alternateName": isRTL ? "فوجي للمصاعد" : "FUJI Elevators",
    "url": "https://www.fujifd-ksa.com",
    "logo": "https://www.fujifd-ksa.com/fuji-logo.jpg",
    "description": isRTL 
      ? "شركة FUJI FD الرائدة في مجال المصاعد بالمملكة العربية السعودية"
      : "FUJI FD is the leading elevator company in Saudi Arabia",
    "foundingDate": "2010",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "King Abdulaziz Road",
      "addressLocality": "Jeddah",
      "addressRegion": "Makkah Province",
      "postalCode": "21589",
      "addressCountry": "SA"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+966549561015",
        "contactType": "customer service",
        "areaServed": "SA",
        "availableLanguage": ["Arabic", "English"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "08:00",
          "closes": "17:00"
        }
      }
    ],
    "sameAs": [
      "https://www.facebook.com/FUJIFD",
      "https://www.instagram.com/FUJIFD",
      "https://www.linkedin.com/company/FUJIFD",
      "https://twitter.com/FUJIFD"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Saudi Arabia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": isRTL ? "خدمات المصاعد" : "Elevator Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": isRTL ? "تركيب المصاعد" : "Elevator Installation",
            "description": isRTL ? "تركيب جميع أنواع المصاعد بأعلى معايير الجودة" : "Installation of all types of elevators with highest quality standards"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": isRTL ? "صيانة المصاعد" : "Elevator Maintenance",
            "description": isRTL ? "خدمات صيانة شاملة لضمان الأداء الأمثل" : "Comprehensive maintenance services to ensure optimal performance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": isRTL ? "تحديث المصاعد" : "Elevator Modernization",
            "description": isRTL ? "تحديث المصاعد القديمة بأحدث التقنيات" : "Modernizing old elevators with latest technologies"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  });

  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "FUJI FD",
    "image": "https://www.fujifd-ksa.com/fuji-logo.jpg",
    "telephone": "+966549561015",
    "email": "info@fujifd-ksa.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "King Abdulaziz Road",
      "addressLocality": "Jeddah",
      "addressRegion": "Makkah Province",
      "postalCode": "21589",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.485811,
      "longitude": 39.192505
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$",
    "servesCuisine": null,
    "acceptsReservations": true
  });

  const getProductSchema = (product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "FUJI FD"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "FUJI FD"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "SAR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "FUJI FD"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "25"
    }
  });

  const getBreadcrumbSchema = (breadcrumbs) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  });

  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FUJI FD",
    "url": "https://www.fujifd-ksa.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.fujifd-ksa.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  const getSchema = () => {
    switch (type) {
      case 'organization':
        return getOrganizationSchema();
      case 'localBusiness':
        return getLocalBusinessSchema();
      case 'product':
        return getProductSchema(data);
      case 'breadcrumb':
        return getBreadcrumbSchema(data);
      case 'website':
        return getWebsiteSchema();
      default:
        return getOrganizationSchema();
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getSchema())}
      </script>
    </Helmet>
  );
};

export default StructuredData;
