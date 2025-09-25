# دليل إعداد Analytics - موقع FUJI FD

## 📊 نظرة عامة

تم تصميم نظام Analytics في موقع FUJI FD ليعمل فقط في بيئة الإنتاج، مما يمنع الأخطاء والتتبع غير المرغوب فيه أثناء التطوير.

## 🔧 إعداد متغيرات البيئة

### 1. ملف .env للتطوير (الحالي):
```env
# Analytics Configuration (Development - Leave empty)
REACT_APP_GA_MEASUREMENT_ID=
REACT_APP_GTM_ID=
REACT_APP_FB_PIXEL_ID=
REACT_APP_CLARITY_ID=
REACT_APP_HOTJAR_ID=
```

### 2. ملف .env للإنتاج:
```env
# Analytics Configuration (Production)
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
REACT_APP_GTM_ID=GTM-XXXXXXX
REACT_APP_FB_PIXEL_ID=123456789012345
REACT_APP_CLARITY_ID=abcdefghij
REACT_APP_HOTJAR_ID=1234567
```

## 🚀 خطوات الإعداد للإنتاج

### 1. Google Analytics 4
1. اذهب إلى [Google Analytics](https://analytics.google.com/)
2. أنشئ حساب جديد أو استخدم حساب موجود
3. أنشئ خاصية جديدة لموقع FUJI FD
4. احصل على Measurement ID (يبدأ بـ G-)
5. أضف المعرف إلى `REACT_APP_GA_MEASUREMENT_ID`

### 2. Google Tag Manager
1. اذهب إلى [Google Tag Manager](https://tagmanager.google.com/)
2. أنشئ حساب وحاوية جديدة
3. احصل على Container ID (يبدأ بـ GTM-)
4. أضف المعرف إلى `REACT_APP_GTM_ID`

### 3. Facebook Pixel
1. اذهب إلى [Facebook Business Manager](https://business.facebook.com/)
2. انتقل إلى Events Manager
3. أنشئ Pixel جديد
4. احصل على Pixel ID (رقم مكون من 15 رقم)
5. أضف المعرف إلى `REACT_APP_FB_PIXEL_ID`

### 4. Microsoft Clarity
1. اذهب إلى [Microsoft Clarity](https://clarity.microsoft.com/)
2. أنشئ مشروع جديد
3. احصل على Project ID
4. أضف المعرف إلى `REACT_APP_CLARITY_ID`

### 5. Hotjar
1. اذهب إلى [Hotjar](https://www.hotjar.com/)
2. أنشئ حساب وموقع جديد
3. احصل على Site ID (رقم)
4. أضف المعرف إلى `REACT_APP_HOTJAR_ID`

## 🔍 التحقق من التثبيت

### في بيئة التطوير:
- ✅ لا تظهر أخطاء Analytics
- ✅ يظهر مؤشر "Development Mode" في الزاوية السفلية
- ✅ لا يتم تحميل سكريبتات التتبع

### في بيئة الإنتاج:
- ✅ تعمل جميع أدوات التحليل
- ✅ يتم تتبع الأحداث بشكل صحيح
- ✅ لا تظهر أخطاء في Console

## 📈 الأحداث المتتبعة

### 1. أحداث الصفحة:
- **Page View**: عرض الصفحة
- **Page Load Time**: وقت تحميل الصفحة
- **Bounce Rate**: معدل الارتداد

### 2. أحداث المنتجات:
- **Product View**: عرض المنتج
- **Add to Cart**: إضافة للسلة
- **Order Now**: طلب مباشر
- **WhatsApp Click**: النقر على WhatsApp

### 3. أحداث التفاعل:
- **Form Submit**: إرسال النماذج
- **Button Click**: النقر على الأزرار
- **File Download**: تحميل الملفات
- **External Link**: الروابط الخارجية

## 🎯 استخدام دوال التتبع المخصصة

```javascript
import { trackEvent, trackAddToCart, trackPurchase } from '../components/Analytics';

// تتبع حدث مخصص
trackEvent('button_click', {
  button_name: 'contact_us',
  page_location: window.location.href
});

// تتبع إضافة للسلة
trackAddToCart('product_123', 'مصعد بدون تروس', 'elevator', 1, 50000);

// تتبع عملية شراء
trackPurchase('order_456', 75000, 'SAR', [
  { item_id: 'product_123', item_name: 'مصعد بدون تروس', quantity: 1, price: 50000 }
]);
```

## 🛡️ الأمان والخصوصية

### 1. حماية البيانات:
- ✅ لا يتم تتبع معلومات شخصية حساسة
- ✅ يتم تشفير جميع البيانات المرسلة
- ✅ الامتثال لقوانين GDPR و CCPA

### 2. إعدادات الخصوصية:
```javascript
// Google Analytics - إعدادات الخصوصية
gtag('config', 'GA_MEASUREMENT_ID', {
  anonymize_ip: true,
  respect_dnt: true,
  allow_google_signals: false
});
```

## 🔧 استكشاف الأخطاء وإصلاحها

### مشاكل شائعة:

#### 1. لا تعمل Analytics في التطوير:
**الحل**: هذا طبيعي! Analytics تعمل فقط في الإنتاج.

#### 2. خطأ "Invalid PixelID":
**الحل**: تأكد من إضافة Facebook Pixel ID الصحيح في .env

#### 3. خطأ "YOUR_CLARITY_ID is not defined":
**الحل**: تأكد من إضافة Microsoft Clarity ID في .env

#### 4. لا تظهر البيانات في Google Analytics:
**الحل**: قد يستغرق الأمر 24-48 ساعة لظهور البيانات

## 📊 مراقبة الأداء

### مؤشرات مهمة للمراقبة:
- **Page Load Time**: < 3 ثوان
- **Bounce Rate**: < 40%
- **Session Duration**: > 2 دقيقة
- **Conversion Rate**: > 3%

### تقارير مفيدة:
1. **Real-time Report**: الزوار الحاليين
2. **Audience Report**: تحليل الجمهور
3. **Acquisition Report**: مصادر الزيارات
4. **Behavior Report**: سلوك المستخدمين
5. **Conversion Report**: معدلات التحويل

## 🎉 الخلاصة

نظام Analytics في موقع FUJI FD مُحسن للأداء والخصوصية:

✅ **يعمل فقط في الإنتاج** - لا أخطاء في التطوير
✅ **متعدد المنصات** - Google, Facebook, Microsoft, Hotjar
✅ **آمن ومحمي** - يحترم خصوصية المستخدمين
✅ **سهل الإعداد** - متغيرات بيئة بسيطة
✅ **تتبع شامل** - جميع الأحداث المهمة

**للتفعيل في الإنتاج**: أضف المعرفات الصحيحة في ملف .env وقم بالنشر! 🚀
