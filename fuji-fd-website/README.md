# FUJI FD Elevators - Website Theme

موقع شركة FUJI FD للمصاعد والسلالم المتحركة - ثيم كامل وجاهز للتسليم

## 📋 نظرة عامة

هذا الثيم مصمم خصيصاً لشركة FUJI FD Elevators ويتضمن:
- تصميم عصري ومتجاوب (Responsive)
- دعم كامل للغة العربية (RTL)
- ألوان العلامة التجارية الرسمية
- مكونات قابلة لإعادة الاستخدام
- تحسين لمحركات البحث (SEO)
- إمكانية الوصول (Accessibility)

## 🎨 الهوية اللونية

```css
:root {
  --fuji-blue: #146FB6;
  --fuji-blue-dark: #054A7B;
  --fuji-blue-600: #0A6AAA;
  --fuji-accent-red: #E21E26;
  --bg: #FFFFFF;
  --surface: #F5F7FA;
  --muted: #6B7280;
  --text: #111827;
}
```

## 📁 هيكل الملفات

```
fuji-fd-website/
├── index.html              # الصفحة الرئيسية
├── styles.css              # الأنماط المخصصة
├── script.js               # JavaScript الرئيسي
├── tailwind.config.js      # إعدادات Tailwind CSS
├── README.md               # هذا الملف
├── components/             # المكونات
│   ├── header.html         # رأس الصفحة
│   ├── hero.html          # القسم الرئيسي
│   ├── product-card.html  # بطاقات المنتجات
│   └── footer.html        # تذييل الصفحة
└── assets/                # الأصول
    ├── logo.png           # شعار الشركة
    ├── favicon-32x32.png  # أيقونة المفضلة 32x32
    └── favicon-16x16.png  # أيقونة المفضلة 16x16
```

## 🚀 التشغيل السريع

### 1. فتح الموقع محلياً

يمكنك فتح الملف `index.html` مباشرة في المتصفح، أو استخدام خادم محلي:

```bash
# باستخدام Python
python -m http.server 8000

# باستخدام Node.js
npx serve .

# باستخدام PHP
php -S localhost:8000
```

ثم افتح المتصفح على: `http://localhost:8000`

### 2. تطوير مع Tailwind CSS

إذا كنت تريد تعديل الأنماط:

```bash
# تثبيت Tailwind CSS
npm install -D tailwindcss
npx tailwindcss init

# بناء ملف CSS
npx tailwindcss -i ./styles.css -o ./dist/output.css --watch
```

## 🛠️ التخصيص

### تغيير الألوان

عدّل المتغيرات في `styles.css`:

```css
:root {
  --fuji-blue: #YOUR_COLOR;
  --fuji-accent-red: #YOUR_COLOR;
}
```

أو في `tailwind.config.js`:

```javascript
colors: {
  "fuji-blue": "#YOUR_COLOR",
  "fuji-accent": "#YOUR_COLOR"
}
```

### إضافة محتوى جديد

1. عدّل `index.html` لإضافة أقسام جديدة
2. أنشئ مكونات جديدة في مجلد `components/`
3. حدّث `script.js` لتحميل المكونات الجديدة

### تخصيص النصوص

جميع النصوص موجودة في ملفات HTML ويمكن تعديلها مباشرة:

- العنوان الرئيسي: `components/hero.html`
- معلومات التواصل: `components/footer.html`
- روابط التنقل: `components/header.html`

## 📱 الاستجابة (Responsive)

الموقع مُحسَّن للعمل على جميع الأجهزة:

- **Desktop**: 1200px وأكبر
- **Tablet**: 768px - 1199px
- **Mobile**: أقل من 768px

## 🔧 الميزات التقنية

### JavaScript

- تحميل المكونات ديناميكياً
- قائمة الجوال التفاعلية
- تأثيرات التمرير (Scroll Animations)
- التمرير السلس (Smooth Scrolling)
- دعم لوحة المفاتيح

### CSS

- متغيرات CSS مخصصة
- تأثيرات الحركة (Animations)
- تحسين الأداء
- دعم الطباعة

### HTML

- بنية دلالية (Semantic HTML)
- إمكانية الوصول (ARIA labels)
- تحسين محركات البحث (SEO)
- Open Graph للمشاركة الاجتماعية

## 📞 معلومات التواصل

- **الهاتف**: +966 55 956 8068
- **البريد الإلكتروني**: info@fujifd-ksa.com
- **الموقع**: الرياض، المملكة العربية السعودية

## 🔄 التحديثات المستقبلية

### المخطط له:

- [ ] نظام إدارة المحتوى (CMS)
- [ ] متجر إلكتروني للقطع الغيار
- [ ] نظام حجز الصيانة أونلاين
- [ ] تطبيق الجوال
- [ ] لوحة تحكم العملاء

### التحسينات:

- [ ] تحسين سرعة التحميل
- [ ] إضافة المزيد من اللغات
- [ ] تحسين إمكانية الوصول
- [ ] إضافة اختبارات آلية

## 📄 الترخيص

هذا الثيم مصمم خصيصاً لشركة FUJI FD Elevators.
جميع الحقوق محفوظة © 2024 FUJI FD Elevators.

## 🆘 الدعم الفني

للحصول على الدعم الفني أو الاستفسارات:

1. تواصل مع فريق التطوير
2. راجع التوثيق أعلاه
3. تحقق من ملفات المكونات للأمثلة

---

**ملاحظة**: تأكد من استبدال الصور والشعارات الوهمية بالصور الحقيقية قبل النشر النهائي.
