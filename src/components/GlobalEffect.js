import cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
    {
        code: 'en',
    },
    {
        code: 'ar',
        dir: 'rtl'
    }

]

const GlobalEffect = () => {
    const currentLanguageCode = cookies.get('i18next') || 'ar'
    const currentLanguage = languages.find(l => l.code === currentLanguageCode)
    const { t } = useTranslation();

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('App_Name')
        console.log(document.description);
    }, [currentLanguage, t])

    return null;
}

export default GlobalEffect