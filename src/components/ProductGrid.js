import React, { memo } from 'react';
import { PRODUCTS } from '../data/products';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";
import RiyalSymbol from './RiyalSymbol';
import { useCart } from '../context/CartContext';
import LazyImage from './LazyImage';

const ProductGrid = () => {
  // const { t } = useTranslation(); // Removed unused import
  const currentLanguageCode = cookies.get('i18next');
  const isRTL = currentLanguageCode === 'ar';
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem(product, 1);
  };

  const handleOrderNow = (product) => {
    const productName = isRTL ? product.nameAR : product.nameEN;
    const message = isRTL 
      ? `مرحباً، أريد طلب ${productName} بسعر ${product.price.toLocaleString()} ريال سعودي`
      : `Hello, I want to order ${productName} for ${product.price.toLocaleString()} Saudi Riyal`;
    
    const whatsappUrl = `https://wa.me/966549561015?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // تقسيم المنتجات إلى مجموعات من 2
  const productRows = [];
  for (let i = 0; i < PRODUCTS.length; i += 2) {
    productRows.push(PRODUCTS.slice(i, i + 2));
  }

  return (
    <section className="py-16 bg-fuji-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isRTL ? 'font-cairo' : ''}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-fuji-blue mb-4">
            {isRTL ? 'جميع منتجاتنا' : 'All Our Products'}
          </h2>
          <p className="text-fuji-muted text-lg max-w-2xl mx-auto mb-6">
            {isRTL ? 
              'اكتشف مجموعتنا الكاملة من المصاعد والخدمات المتميزة' :
              'Discover our complete range of premium elevators and services'
            }
          </p>
          
          {/* Catalog Button */}
          <div className="flex justify-center">
            <button
              onClick={() => window.open('/catalog/catalog.pdf', '_blank')}
              className={`inline-flex items-center gap-3 bg-fuji-blue hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${isRTL ? 'font-cairo' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>
                {isRTL ? 'تحميل كتالوج المنتجات' : 'Download Product Catalog'}
              </span>
            </button>
          </div>
        </div>

        {/* Products Grid - 2x2x2 Layout */}
        <div className="space-y-12">
          {productRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {row.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden">
                    <LazyImage 
                      src={product.image} 
                      alt={isRTL ? product.nameAR : product.nameEN}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-fuji-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {isRTL ? 
                          (product.category === 'elevators' ? 'مصعد' : 
                           product.category === 'services' ? 'خدمة' : 'قطع غيار') :
                          (product.category === 'elevators' ? 'Elevator' : 
                           product.category === 'services' ? 'Service' : 'Parts')
                        }
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {/* Title */}
                    <h3 className={`text-xl font-bold text-fuji-blue mb-3 ${isRTL ? 'font-cairo' : ''}`}>
                      {isRTL ? product.nameAR : product.nameEN}
                    </h3>

                    {/* Description */}
                    <p className={`text-fuji-muted mb-4 leading-relaxed ${isRTL ? 'font-cairo' : ''}`}>
                      {isRTL ? product.descriptionAR : product.descriptionEN}
                    </p>

                    {/* Price */}
                    <div className={`mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-center gap-2 text-2xl font-bold text-fuji-blue ${isRTL ? 'justify-end' : 'justify-start'}`}>
                        {isRTL ? (
                          <>
                            <span>{product.price.toLocaleString()}</span>
                            <span className="text-lg font-medium">ريال سعودي</span>
                            <RiyalSymbol className="w-6 h-6" />
                          </>
                        ) : (
                          <>
                            <span>{product.price.toLocaleString()}</span>
                            <span className="text-lg font-medium">Saudi Riyal</span>
                            <RiyalSymbol className="w-6 h-6" />
                          </>
                        )}
                      </div>
                      <p className={`text-xs text-fuji-muted mt-1 ${isRTL ? 'font-cairo' : ''}`}>
                        {isRTL ? 'شامل التركيب والضمان' : 'Including installation & warranty'}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`flex-1 px-4 py-3 bg-fuji-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${isRTL ? 'font-cairo' : ''}`}
                      >
                        {isRTL ? 'أضف للسلة' : 'Add to Cart'}
                      </button>
                      <button
                        onClick={() => handleOrderNow(product)}
                        className={`flex-1 px-4 py-3 bg-fuji-accent text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${isRTL ? 'font-cairo' : ''}`}
                      >
                        {isRTL ? 'اطلب الآن' : 'Order Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 ${isRTL ? 'font-cairo' : ''}`}>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-fuji-blue/10">
            <h3 className="text-2xl font-bold text-fuji-blue mb-4">
              {isRTL ? 'هل تحتاج مساعدة في الاختيار؟' : 'Need Help Choosing?'}
            </h3>
            <p className="text-fuji-muted mb-6">
              {isRTL ? 
                'فريقنا من الخبراء جاهز لمساعدتك في اختيار المصعد المناسب لاحتياجاتك' :
                'Our expert team is ready to help you choose the right elevator for your needs'
              }
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className={`px-8 py-4 bg-fuji-accent text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${isRTL ? 'font-cairo' : ''}`}
            >
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ProductGrid);
