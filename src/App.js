import MainLayout from "./pages/MainLayout";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import GlobalEffect from "./components/GlobalEffect";
import RTLProvider from "./components/RTLProvider";


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ar'],
    fallbackLng: "en",
    detection:
    {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: { useSuspense: false },
  });

function App() {
  return (
    <>
      <BrowserRouter>
        <RTLProvider>
          <CartProvider>
            <GlobalEffect />
            <Routes>
              <Route>
                <Route path="/" element={<MainLayout />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Routes>
          </CartProvider>
        </RTLProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
