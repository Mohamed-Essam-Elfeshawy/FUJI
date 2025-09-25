import React from 'react';
import { Helmet } from 'react-helmet';

const Analytics = () => {
  // Only load analytics in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Google Analytics 4 Measurement ID
  const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || null;
  
  // Google Tag Manager ID
  const GTM_ID = process.env.REACT_APP_GTM_ID || null;
  
  // Facebook Pixel ID
  const FB_PIXEL_ID = process.env.REACT_APP_FB_PIXEL_ID || null;
  
  // Microsoft Clarity ID
  const CLARITY_ID = process.env.REACT_APP_CLARITY_ID || null;
  
  // Hotjar ID
  const HOTJAR_ID = process.env.REACT_APP_HOTJAR_ID || null;

  // Don't render anything in development or if no IDs are provided
  if (!isProduction) {
    return null;
  }

  return (
    <Helmet>
      {/* Google Tag Manager */}
      {GTM_ID && (
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </script>
      )}

      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true
              });
            `}
          </script>
        </>
      )}

      {/* Facebook Pixel */}
      {FB_PIXEL_ID && (
        <>
          <script>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </script>
          <noscript>{`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1" />`}</noscript>
        </>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_ID && (
        <script type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </script>
      )}

      {/* Hotjar Tracking Code */}
      {HOTJAR_ID && (
        <script>
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </script>
      )}
    </Helmet>
  );
};

// Custom event tracking functions
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPurchase = (transactionId, value, currency = 'SAR', items = []) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items
    });
  }
};

export const trackAddToCart = (itemId, itemName, category, quantity, price) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'SAR',
      value: price * quantity,
      items: [{
        item_id: itemId,
        item_name: itemName,
        category: category,
        quantity: quantity,
        price: price
      }]
    });
  }
};

export const trackContact = (method = 'whatsapp') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact', {
      method: method
    });
  }
};

export const trackCatalogDownload = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_download', {
      file_name: 'catalog.pdf',
      file_extension: 'pdf'
    });
  }
};

export default Analytics;
