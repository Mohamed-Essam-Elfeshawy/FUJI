import React, { useState, memo, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";
import RiyalSymbol from './RiyalSymbol';
import LazyImage from './LazyImage';

const Cart = ({ isOpen, onClose }) => {
    // const { t } = useTranslation(); // Removed unused import
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';
    const { items, removeItem, updateQty, clear, totals } = useCart();
    const [isOrdering, setIsOrdering] = useState(false);

    const sendWhatsAppOrder = useCallback(() => {
        if (items.length === 0) return;
        
        setIsOrdering(true);
        
        const orderDetails = items.map((item, index) => 
            `${index + 1}. ${item.nameAR || item.name}
   السعر: ${item.price.toLocaleString()} ريال
   الكمية: ${item.qty} قطعة
   الإجمالي: ${(item.price * item.qty).toLocaleString()} ريال`
        ).join('\n\n');

        const message = `🏢 طلب جديد من موقع فوجي FUJI FD
السلام عليكم ورحمة الله وبركاته

🛒 تفاصيل الطلب:
${orderDetails}

💰 ملخص التكاليف:
┌─────────────────────────────────
│ المجموع الفرعي: ${totals.subtotal.toLocaleString()} ريال
│ رسوم الشحن: ${totals.shipping.toLocaleString()} ريال  
│ الضريبة (15%): ${totals.tax.toLocaleString()} ريال
├─────────────────────────────────
│ 💎 الإجمالي النهائي: ${totals.total.toLocaleString()} ريال
└─────────────────────────────────

شكراً لكم 🙏`;

        const phoneNumber = "966549561015";
        const encodedMessage = encodeURIComponent(message);
        
        try {
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
                setTimeout(() => {
                    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
                }, 1500);
            } else {
                window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
            }
            
            // Clear cart after successful order
            setTimeout(() => {
                clear();
                onClose();
                setIsOrdering(false);
            }, 2000);
            
        } catch (error) {
            console.error('WhatsApp error:', error);
            navigator.clipboard.writeText(message).then(() => {
                alert(isRTL ? 
                    `تم نسخ الطلب! 📋\n\nافتح WhatsApp يدوياً وأرسل للرقم:\n+966 54 956 1015` : 
                    `Order copied! 📋\n\nOpen WhatsApp manually and send to:\n+966 54 956 1015`
                );
            });
            setIsOrdering(false);
        }
    }, [items, totals, isRTL, clear, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-fuji-surface to-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-fuji-blue rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                        </div>
                        <h2 className={`text-2xl font-bold text-fuji-blue ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'سلة التسوق' : 'Shopping Cart'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all duration-200 group"
                    >
                        <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col h-full max-h-[calc(90vh-80px)]">
                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-8">
                            <div className="w-24 h-24 bg-fuji-surface rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-fuji-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                </svg>
                            </div>
                            <h3 className={`text-xl font-semibold text-fuji-blue mb-2 ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? 'السلة فارغة' : 'Cart is Empty'}
                            </h3>
                            <p className={`text-fuji-muted text-center ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? 'أضف بعض المنتجات لتبدأ التسوق' : 'Add some products to start shopping'}
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Items List */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-5 bg-gradient-to-r from-fuji-surface to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200">
                                        <div className="relative">
                                            <LazyImage 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-xl shadow-md"
                                            />
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-fuji-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                {item.qty}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`font-semibold text-fuji-blue mb-1 ${isRTL ? 'font-cairo' : ''}`}>
                                                {item.nameAR || item.name}
                                            </h4>
                                            <p className={`text-fuji-accent font-bold flex items-center ${isRTL ? 'font-cairo justify-end' : 'justify-start'}`}>
                                                {isRTL ? (
                                                    <>
                                                        {item.price.toLocaleString()} <RiyalSymbol className="w-5 h-5 ml-1" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <RiyalSymbol className="w-5 h-5 mr-1" /> {item.price.toLocaleString()}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQty(item.id, item.qty - 1)}
                                                className="w-8 h-8 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-fuji-blue font-semibold"
                                            >
                                                -
                                            </button>
                                            <span className={`w-12 text-center font-semibold text-fuji-blue ${isRTL ? 'font-cairo' : ''}`}>
                                                {item.qty}
                                            </span>
                                            <button
                                                onClick={() => updateQty(item.id, item.qty + 1)}
                                                className="w-8 h-8 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-fuji-blue font-semibold"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center text-red-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-fuji-surface">
                                <div className="space-y-2 mb-4">
                                    <div className={`flex justify-between text-fuji-muted ${isRTL ? 'font-cairo' : ''}`}>
                                        <span>{isRTL ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                                        <span className="flex items-center">
                                            {isRTL ? (
                                                <>
                                                    {totals.subtotal.toLocaleString()} <RiyalSymbol className="w-4 h-4 ml-1" />
                                                </>
                                            ) : (
                                                <>
                                                    <RiyalSymbol className="w-4 h-4 mr-1" /> {totals.subtotal.toLocaleString()}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    <div className={`flex justify-between text-fuji-muted ${isRTL ? 'font-cairo' : ''}`}>
                                        <span>{isRTL ? 'الشحن:' : 'Shipping:'}</span>
                                        <span className="flex items-center">
                                            {isRTL ? (
                                                <>
                                                    {totals.shipping.toLocaleString()} <RiyalSymbol className="w-4 h-4 ml-1" />
                                                </>
                                            ) : (
                                                <>
                                                    <RiyalSymbol className="w-4 h-4 mr-1" /> {totals.shipping.toLocaleString()}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    <div className={`flex justify-between text-fuji-muted ${isRTL ? 'font-cairo' : ''}`}>
                                        <span>{isRTL ? 'الضريبة (15%):' : 'Tax (15%):'}</span>
                                        <span className="flex items-center">
                                            {isRTL ? (
                                                <>
                                                    {totals.tax.toLocaleString()} <RiyalSymbol className="w-4 h-4 ml-1" />
                                                </>
                                            ) : (
                                                <>
                                                    <RiyalSymbol className="w-4 h-4 mr-1" /> {totals.tax.toLocaleString()}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    <div className={`flex justify-between text-lg font-bold text-fuji-blue border-t pt-2 ${isRTL ? 'font-cairo' : ''}`}>
                                        <span>{isRTL ? 'الإجمالي:' : 'Total:'}</span>
                                        <span className="flex items-center">
                                            {isRTL ? (
                                                <>
                                                    {totals.total.toLocaleString()} <RiyalSymbol className="w-6 h-6 ml-1" />
                                                </>
                                            ) : (
                                                <>
                                                    <RiyalSymbol className="w-6 h-6 mr-1" /> {totals.total.toLocaleString()}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={clear}
                                        className={`w-32 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${isRTL ? 'font-cairo' : ''}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span>{isRTL ? 'مسح السلة' : 'Clear Cart'}</span>
                                    </button>
                                    <button
                                        onClick={sendWhatsAppOrder}
                                        disabled={isOrdering}
                                        className={`flex-1 py-4 bg-gradient-to-r from-fuji-accent to-fuji-accent-red text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${isRTL ? 'font-cairo' : ''}`}
                                    >
                                        {isOrdering ? (
                                            <>
                                                <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>{isRTL ? 'جاري الإرسال...' : 'Processing...'}</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                                                </svg>
                                                <span>{isRTL ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(Cart);
