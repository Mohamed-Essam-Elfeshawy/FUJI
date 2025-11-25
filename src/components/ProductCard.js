import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import cookies from "js-cookie";

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next');
  const isRTL = currentLanguageCode === 'ar';
  const [quantity, setQuantity] = useState(1);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const clamp = (n, min = 1, max = 999) => Math.max(min, Math.min(max, n));

  const onInc = () => setQuantity((q) => clamp(q + 1));
  const onDec = () => setQuantity((q) => clamp(q - 1));
  const onChange = (e) => {
    const v = parseInt(e.target.value || "0", 10);
    setQuantity(clamp(isNaN(v) ? 1 : v));
  };

  const sendWhatsAppMessage = () => {
    const productName = product.nameAR || product.name;
    const productPrice = `${product.price.toLocaleString()} ريال سعودي`;
    const totalPrice = `${(product.price * quantity).toLocaleString()} ريال سعودي`;
    
    const message = `السلام عليكم
عاوز اطلب المنتج ده من موقع فوجي FUJI FD:

اسم المنتج: ${productName}
السعر للوحدة: ${productPrice}
الكمية المطلوبة: ${quantity} قطعة
اجمالي السعر: ${totalPrice}
رقم المنتج: ${product.id}

شكرا لكم وبانتظار ردكم`;

    const phoneNumber = "966549561015";
    const encodedMessage = encodeURIComponent(message);
    
    // Debug: Log the phone number and URL
    console.log('Phone Number:', phoneNumber);
    console.log('WhatsApp URL:', `https://wa.me/${phoneNumber}?text=${encodedMessage}`);
    
    // Show confirmation first using window.confirm to fix ESLint error
    // eslint-disable-next-line no-restricted-globals
    const confirmed = window.confirm(isRTL ? 
      'هل تريد إرسال طلبك عبر WhatsApp؟\n\nسيتم فتح WhatsApp مع رسالة طلبك جاهزة.' : 
      'Do you want to send your order via WhatsApp?\n\nWhatsApp will open with your order message ready.'
    );
    
    if (!confirmed) return;
    
    // Create WhatsApp URL - try different formats for better compatibility
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    // Detect device type and open accordingly
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    try {
      if (isMobile) {
        // For mobile: try different methods
        // Method 1: Direct app protocol
        window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
        
        // Method 2: Fallback to wa.me
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 1500);
        
        // Method 3: Final fallback to API
        setTimeout(() => {
          window.open(whatsappApiUrl, '_blank');
        }, 3000);
      } else {
        // For desktop: try web first, then API
        window.open(whatsappWebUrl, '_blank');
        
        // Fallback
        setTimeout(() => {
          window.open(whatsappApiUrl, '_blank');
        }, 2000);
      }
    } catch (error) {
      console.error('WhatsApp open error:', error);
      // Final fallback: copy message and show manual instructions
      navigator.clipboard.writeText(message).then(() => {
        // eslint-disable-next-line no-restricted-globals
        window.alert(isRTL ? 
          `تم نسخ الرسالة! 📋\n\nافتح WhatsApp يدوياً وأرسل للرقم:\n+966 54 956 1015\n\nأو الصق الرسالة المنسوخة.` : 
          `Message copied! 📋\n\nOpen WhatsApp manually and send to:\n+966 54 956 1015\n\nOr paste the copied message.`
        );
      });
    }
    
    // Show instructions using window.alert to be consistent
    setTimeout(() => {
      // eslint-disable-next-line no-restricted-globals
      window.alert(isRTL ? 
        'تم فتح WhatsApp! 📱\n\n• تأكد من أن الرسالة ظهرت\n• اضغط زر الإرسال\n• الرقم: +966 54 956 1015' : 
        'WhatsApp opened! 📱\n\n• Make sure the message appeared\n• Press the send button\n• Number: +966 54 956 1015'
      );
    }, 1500);
  };

  const handleOrderNow = (e) => {
    e.preventDefault();
    sendWhatsAppMessage();
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    
    const productToAdd = {
      id: product.id,
      name: product.name,
      nameAR: product.nameAR,
      nameEN: product.nameEN,
      price: product.price,
      image: product.image
    };
    
    addItem(productToAdd, quantity);
    
    // Show feedback and redirect to cart
    setTimeout(() => {
      setIsAdding(false);
      setShowQuantitySelector(false);
      setQuantity(1);
      
      // Show success message
      const message = isRTL ? 
        `تم إضافة ${productToAdd.nameAR || productToAdd.name} للسلة! 🛒` : 
        `${productToAdd.nameEN || productToAdd.name} added to cart! 🛒`;
      
      // You can add a toast notification here if needed
      console.log(message);
      
    }, 500);
  };
  
  return (
    <div className="group bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-100 hover:border-fuji-accent/20">
      <div className="relative">
        <img src={product.image} alt={product.name} className="h-56 w-full object-cover" loading="lazy" decoding="async" fetchpriority="low" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h3 className={`text-fuji-blue font-semibold text-lg mb-1 ${isRTL ? 'font-cairo' : ''}`}>
          {isRTL ? (product.nameAR || product.name) : (product.nameEN || product.name)}
        </h3>
        <p className={`text-fuji-accent text-sm leading-relaxed mb-4 ${isRTL ? 'font-cairo' : ''}`}>
          {isRTL ? (product.descriptionAR || product.description) : (product.descriptionEN || product.description)}
        </p>
        {/* Price */}
        <div className={`mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={`text-fuji-blue font-bold text-lg ${isRTL ? 'font-cairo' : ''} flex items-center gap-1 leading-none`}>
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
          {quantity > 1 && (
            <div className={`text-sm text-fuji-muted mt-1 ${isRTL ? 'font-cairo' : ''} flex items-center gap-1 leading-none`}>
              <span>{isRTL ? 'الإجمالي:' : 'Total:'} {(product.price * quantity).toLocaleString()}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382 428" className="w-4 h-4 translate-y-[1px]">
                <path d="M223.564 62.2622C239.654 44.2002 249.543 36.0911 268.965 25.839V326.607L223.564 335.988V62.2622Z" fill="rgb(20,111,182)"/>
                <path d="M368.627 213.474C378.039 193.607 379.147 184.777 381.667 164.396L33.6534 239.963C25.4006 258.346 22.7442 268.622 21.4724 286.872L368.627 213.474Z" fill="rgb(20,111,182)"/>
                <path d="M368.627 305.598C378.039 285.73 379.147 276.9 381.667 256.52L225.225 289.632C224.118 307.843 225.389 317.186 224.118 335.436L368.627 305.598Z" fill="rgb(20,111,182)"/>
                <path d="M368.627 397.708C378.039 377.841 379.147 369.011 381.667 348.63L239.067 379.586C231.869 389.519 227.44 406.075 224.118 427.547L368.627 397.708Z" fill="rgb(20,111,182)"/>
                <path d="M142.174 366.341C156.016 349.233 170.411 327.71 180.377 310.051L12.514 346.435C4.26132 364.818 1.60486 375.094 0.333069 393.344L142.174 366.341Z" fill="rgb(20,111,182)"/>
                <path d="M134.976 36.8764C151.067 18.8143 160.955 10.7052 180.377 0.453125V311.154L134.976 320.536V36.8764Z" fill="rgb(20,111,182)"/>
              </svg>
            </div>
          )}
        </div>

        {/* Quantity Selector */}
        {showQuantitySelector && (
          <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={onDec}
              className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-fuji-surface flex items-center justify-center text-fuji-blue font-semibold"
              aria-label="decrease"
            >
              -
            </button>

            <input
              type="number"
              min="1"
              max="999"
              value={quantity}
              onChange={onChange}
              className={`w-16 text-center rounded-lg border border-gray-300 focus:border-fuji-accent focus:ring-2 focus:ring-fuji-accent/20 p-1 text-sm ${isRTL ? 'font-cairo' : ''}`}
              aria-label="quantity"
            />

            <button
              onClick={onInc}
              className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-fuji-surface flex items-center justify-center text-fuji-blue font-semibold"
              aria-label="increase"
            >
              +
            </button>

            <div className={`text-sm text-fuji-muted ${isRTL ? 'font-cairo mr-auto' : 'ml-auto'}`}>
              {isRTL ? `${quantity} قطعة` : `${quantity} pieces`}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {!showQuantitySelector ? (
            <button
              onClick={() => setShowQuantitySelector(true)}
              className={`flex-1 px-4 py-2 bg-fuji-surface hover:bg-gray-200 text-fuji-blue rounded-xl text-sm font-semibold transition-all ${isRTL ? 'font-cairo' : ''}`}
            >
              {isRTL ? 'اختر الكمية' : 'Select Quantity'}
            </button>
          ) : (
            <>
              <button
                onClick={() => setShowQuantitySelector(false)}
                className={`px-3 py-2 bg-fuji-surface hover:bg-gray-200 text-fuji-muted rounded-xl text-sm transition-all ${isRTL ? 'font-cairo' : ''}`}
              >
                {isRTL ? 'إخفاء' : 'Hide'}
              </button>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 px-4 py-2 bg-fuji-accent hover:bg-fuji-accent-red text-white rounded-xl text-sm font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2 ${isRTL ? 'font-cairo' : ''}`}
              >
                {isAdding ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{isRTL ? 'جاري الإضافة...' : 'Adding...'}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    <span>{isRTL ? 'أضف للسلة' : 'Add to Cart'}</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
