import React, { useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";

const CATEGORIES = [
  { key: 'all', labelEN: 'All', labelAR: 'الكل' },
  { key: 'elevators', labelEN: 'Elevators', labelAR: 'المصاعد' },
  { key: 'spare_parts', labelEN: 'Spare Parts', labelAR: 'قطع الغيار' },
  { key: 'services', labelEN: 'Services', labelAR: 'الخدمات' },
];

const Shop = () => {
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next');
  const isRTL = currentLanguageCode === 'ar';
  const [category, setCategory] = useState('all');
  
  const filtered = useMemo(() => {
    if (category === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
  }, [category]);

  return (
    <>
      <Navbar />
      <section className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12">
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={`text-center md:text-left ${isRTL ? 'md:text-right' : ''}`}>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-fuji-blue ${isRTL ? 'font-cairo' : ''}`}>
              {isRTL ? 'المتجر الإلكتروني' : 'Online Store'}
            </h1>
            <p className={`text-sm sm:text-base text-fuji-muted mt-1 sm:mt-2 ${isRTL ? 'font-cairo' : ''}`}>
              {isRTL ? 'تصفح المصاعد وقطع الغيار وخطط الخدمة.' : 'Browse elevators, spare parts, and service plans.'}
            </p>
          </div>
          <div className={`flex flex-wrap justify-center md:justify-start gap-2 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all border ${category === c.key ? 'bg-fuji-accent text-white border-fuji-accent' : 'bg-white text-fuji-blue border-gray-200 hover:border-fuji-accent hover:text-fuji-accent'} ${isRTL ? 'font-cairo' : ''}`}
              >
                {isRTL ? c.labelAR : c.labelEN}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 sm:py-16 px-4 ${isRTL ? 'font-cairo' : ''}`}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 bg-fuji-surface rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-fuji-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-fuji-blue mb-2">
              {isRTL ? 'لا توجد منتجات' : 'No Products Found'}
            </h3>
            <p className="text-sm sm:text-base text-fuji-muted max-w-md mx-auto">
              {isRTL ? 'لم يتم العثور على منتجات في هذه الفئة.' : 'No products found in this category.'}
            </p>
          </div>
        )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Shop;
