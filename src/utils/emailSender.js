/**
 * Email Sender Utility
 * نظام إرسال البريد الإلكتروني المحسن لموقع FUJI FD
 */

/**
 * إرسال رسالة مباشرة عبر mailto
 * @param {Object} formData - بيانات النموذج
 * @param {boolean} isRTL - هل اللغة عربية
 */
export const sendDirectEmail = async (formData, isRTL = false) => {
    try {
        const emailSubject = encodeURIComponent(`رسالة من موقع FUJI FD: ${formData.subject}`);
        const emailBody = encodeURIComponent(`
🏢 رسالة جديدة من موقع FUJI FD

👤 معلومات المرسل:
الاسم: ${formData.firstName} ${formData.lastName}
البريد الإلكتروني: ${formData.emailAddress}
رقم الهاتف: ${formData.phoneNumber || 'غير محدد'}

📋 تفاصيل الرسالة:
الموضوع: ${formData.subject}
💬 الرسالة: ${formData.message}

---
تم إرسال هذه الرسالة من موقع FUJI FD
التاريخ: ${new Date().toLocaleDateString('ar-SA')}
الوقت: ${new Date().toLocaleTimeString('ar-SA')}
        `);

        const mailtoLink = `mailto:melfeshawy42@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        window.open(mailtoLink, '_blank');
        
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

/**
 * إرسال رسالة عبر WhatsApp
 * @param {Object} formData - بيانات النموذج
 * @param {boolean} isRTL - هل اللغة عربية
 */
export const sendViaWhatsApp = (formData, isRTL = false) => {
    try {
        const message = `🏢 رسالة جديدة من موقع FUJI FD

👤 معلومات المرسل:
الاسم: ${formData.firstName} ${formData.lastName}
البريد الإلكتروني: ${formData.emailAddress}
رقم الهاتف: ${formData.phoneNumber || 'غير محدد'}

📋 تفاصيل الرسالة:
الموضوع: ${formData.subject}
💬 الرسالة: ${formData.message}

---
تم إرسال هذه الرسالة من موقع FUJI FD
التاريخ: ${new Date().toLocaleDateString('ar-SA')}
الوقت: ${new Date().toLocaleTimeString('ar-SA')}`;

        const whatsappUrl = `https://wa.me/966549561015?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        return { success: true };
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        throw error;
    }
};
