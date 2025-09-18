import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import i18n from "i18next";

i18n.on('languageChanged', (lng) => {
  document.documentElement.className = lng === 'ar' ? 'lang-ar' : 'lang-en';
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);