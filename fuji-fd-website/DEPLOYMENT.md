# دليل النشر - FUJI FD Elevators Website

## 🚀 خطوات النشر

### 1. التحضير للنشر

قبل النشر، تأكد من:

```bash
# تثبيت المتطلبات
npm install

# بناء ملفات الإنتاج
npm run build

# اختبار الموقع محلياً
npm run serve
```

### 2. استبدال الملفات الوهمية

استبدل الملفات التالية بالملفات الحقيقية:

- `assets/logo.png` - شعار FUJI FD الرسمي
- `assets/favicon-32x32.png` - أيقونة المفضلة 32x32
- `assets/favicon-16x16.png` - أيقونة المفضلة 16x16

### 3. تحديث معلومات التواصل

في `components/footer.html` و `components/header.html`:

```html
<!-- تحديث رقم الهاتف -->
<a href="tel:+966559568068">+966 55 956 8068</a>

<!-- تحديث البريد الإلكتروني -->
<a href="mailto:info@fujifd-ksa.com">info@fujifd-ksa.com</a>

<!-- تحديث رابط الواتساب -->
<a href="https://wa.me/966559568068">واتساب</a>
```

## 🌐 خيارات الاستضافة

### 1. Netlify (مُوصى به)

```bash
# رفع الملفات إلى Netlify
# 1. اذهب إلى netlify.com
# 2. اسحب مجلد المشروع إلى الموقع
# 3. سيتم النشر تلقائياً
```

### 2. Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# نشر المشروع
vercel --prod
```

### 3. GitHub Pages

```bash
# إنشاء repository جديد على GitHub
# رفع الملفات
# تفعيل GitHub Pages من الإعدادات
```

### 4. استضافة تقليدية (cPanel)

1. ضغط جميع الملفات في ملف ZIP
2. رفع الملفات إلى مجلد `public_html`
3. استخراج الملفات
4. التأكد من أن `index.html` في المجلد الجذر

## 🔧 إعدادات الخادم

### Apache (.htaccess)

إنشاء ملف `.htaccess` في المجلد الجذر:

```apache
# تفعيل الضغط
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# تفعيل التخزين المؤقت
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# إعادة توجيه HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Nginx

إعدادات Nginx:

```nginx
server {
    listen 80;
    server_name fujifd-ksa.com www.fujifd-ksa.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name fujifd-ksa.com www.fujifd-ksa.com;
    
    root /var/www/fuji-fd;
    index index.html;
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    
    # Cache static files
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📊 مراقبة الأداء

### Google Analytics

أضف هذا الكود قبل `</head>` في `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console

1. إضافة الموقع إلى Google Search Console
2. التحقق من الملكية
3. إرسال خريطة الموقع (sitemap)

## 🔍 تحسين محركات البحث (SEO)

### إنشاء sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fujifd-ksa.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### إنشاء robots.txt

```
User-agent: *
Allow: /

Sitemap: https://fujifd-ksa.com/sitemap.xml
```

## 🛡️ الأمان

### إعدادات الأمان

أضف headers الأمان في `.htaccess`:

```apache
# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Content-Security-Policy "default-src 'self'"
```

## 📱 اختبار الموقع

### قائمة الفحص قبل النشر

- [ ] اختبار على جميع المتصفحات الرئيسية
- [ ] اختبار الاستجابة على الأجهزة المختلفة
- [ ] فحص سرعة التحميل (PageSpeed Insights)
- [ ] فحص إمكانية الوصول (Accessibility)
- [ ] اختبار جميع الروابط والنماذج
- [ ] التأكد من عمل جميع الأيقونات والصور
- [ ] فحص التوافق مع RTL

### أدوات الاختبار

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [Wave Web Accessibility Evaluator](https://wave.webaim.org/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## 🔄 التحديثات المستقبلية

### نظام إدارة المحتوى

لإضافة CMS مستقبلاً:

1. تحويل HTML إلى قوالب ديناميكية
2. إضافة قاعدة بيانات
3. إنشاء لوحة تحكم للإدارة

### التحسينات المقترحة

- إضافة PWA (Progressive Web App)
- تحسين الصور بتقنية WebP
- إضافة lazy loading للصور
- تحسين Core Web Vitals

---

**ملاحظة مهمة**: تأكد من اختبار جميع الوظائف بعد النشر والتأكد من عمل جميع الروابط والنماذج بشكل صحيح.
