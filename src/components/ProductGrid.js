import React, { memo } from 'react';
import { PRODUCTS } from '../data/products';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";
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
                      <div className={`flex items-center gap-1 leading-none text-2xl font-bold text-fuji-blue ${isRTL ? 'justify-end' : 'justify-start'}`}>
                        <span>{product.price.toLocaleString()}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382 428" className="w-5 h-5 translate-y-[1px]">
                          <path d="M223.564 62.2622C239.654 44.2002 249.543 36.0911 268.965 25.839V326.607L223.564 335.988V62.2622Z" fill="rgb(20,111,182)"/>
                          <path d="M368.627 213.474C378.039 193.607 379.147 184.777 381.667 164.396L33.6534 239.963C25.4006 258.346 22.7442 268.622 21.4724 286.872L368.627 213.474Z" fill="rgb(20,111,182)"/>
                          <path d="M368.627 305.598C378.039 285.73 379.147 276.9 381.667 256.52L225.225 289.632C224.118 307.843 225.389 317.186 224.118 335.436L368.627 305.598Z" fill="rgb(20,111,182)"/>
                          <path d="M368.627 397.708C378.039 377.841 379.147 369.011 381.667 348.63L239.067 379.586C231.869 389.519 227.44 406.075 224.118 427.547L368.627 397.708Z" fill="rgb(20,111,182)"/>
                          <path d="M142.174 366.341C156.016 349.233 170.411 327.71 180.377 310.051L12.514 346.435C4.26132 364.818 1.60486 375.094 0.333069 393.344L142.174 366.341Z" fill="rgb(20,111,182)"/>
                          <path d="M134.976 36.8764C151.067 18.8143 160.955 10.7052 180.377 0.453125V311.154L134.976 320.536V36.8764Z" fill="rgb(20,111,182)"/>
                        </svg>
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
