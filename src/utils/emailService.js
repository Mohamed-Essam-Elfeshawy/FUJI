import emailjs from 'emailjs-com';

// EmailJS configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_fuji_fd',
    templateId: 'template_contact_form',
    publicKey: 'fuji_fd_public_key'
};

// Initialize EmailJS
export const initEmailJS = () => {
    emailjs.init(EMAILJS_CONFIG.publicKey);
};

// Send contact form email
export const sendContactEmail = async (formData) => {
    try {
        const templateParams = {
            to_email: 'melfeshawy42@gmail.com',
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.emailAddress,
            phone: formData.phoneNumber,
            subject: formData.subject,
            message: formData.message,
            // Formatted message for better readability
            formatted_message: `
🏢 رسالة جديدة من موقع FUJI FD

👤 معلومات المرسل:
الاسم: ${formData.firstName} ${formData.lastName}
البريد الإلكتروني: ${formData.emailAddress}
رقم الهاتف: ${formData.phoneNumber || 'غير محدد'}

📋 تفاصيل الرسالة:
الموضوع: ${formData.subject}

💬 الرسالة:
${formData.message}

---
تم إرسال هذه الرسالة من نموذج التواصل في موقع FUJI FD
التاريخ: ${new Date().toLocaleString('ar-SA')}
            `
        };

        const result = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams,
            EMAILJS_CONFIG.publicKey
        );

        return { success: true, result };
    } catch (error) {
        console.error('EmailJS Error:', error);
        return { success: false, error };
    }
};

// Alternative method using direct email sending
export const sendDirectEmail = async (formData) => {
    try {
        // Create a mailto link as fallback
        const subject = encodeURIComponent(`رسالة من موقع FUJI FD: ${formData.subject}`);
        const body = encodeURIComponent(`
الاسم: ${formData.firstName} ${formData.lastName}
البريد الإلكتروني: ${formData.emailAddress}
رقم الهاتف: ${formData.phoneNumber}

الرسالة:
${formData.message}

---
تم إرسال هذه الرسالة من موقع FUJI FD
        `);
        
        const mailtoLink = `mailto:melfeshawy42@gmail.com?subject=${subject}&body=${body}`;
        window.open(mailtoLink);
        
        return { success: true, method: 'mailto' };
    } catch (error) {
        console.error('Direct email error:', error);
        return { success: false, error };
    }
};

export default {
    initEmailJS,
    sendContactEmail,
    sendDirectEmail
};
