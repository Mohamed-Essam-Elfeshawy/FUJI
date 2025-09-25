import React, { Suspense, lazy } from 'react';
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

// Lazy load components for better performance
const MainLayout = lazy(() => import("./pages/MainLayout"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const Login = lazy(() => import("./components/Login"));
const Shop = lazy(() => import("./pages/Shop"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-fuji-surface">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuji-blue"></div>
      <p className="text-fuji-muted font-medium">جاري التحميل...</p>
    </div>
  </div>
);

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
              <Suspense fallback={<LoadingSpinner />}>
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
              </Suspense>
            </RTLProvider>
          </CartProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
