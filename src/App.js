import MainLayout from "./pages/MainLayout";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import './styles/darkmode.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalEffect from "./components/GlobalEffect";
import RTLProvider from "./components/RTLProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";


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
        <ThemeProvider>
          <CartProvider>
            <RTLProvider>
              <GlobalEffect />
              <Routes>
                <Route>
                  <Route path="/" element={<MainLayout />} />
                  <Route path="about" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:postId" element={<BlogPost />} />
                </Route>
              </Routes>
            </RTLProvider>
          </CartProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
