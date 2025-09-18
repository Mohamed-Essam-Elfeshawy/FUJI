import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RTLProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    // Set document direction and lang attribute
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    
    // Add RTL class to body for additional styling if needed
    if (isRTL) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [isRTL, i18n.language]);

  return (
    <div className={`${isRTL ? 'font-arabic' : 'font-inter'} ${isRTL ? 'text-right' : 'text-left'}`}>
      {children}
    </div>
  );
};

export default RTLProvider;
