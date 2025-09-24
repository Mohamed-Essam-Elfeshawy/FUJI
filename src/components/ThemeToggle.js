import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`relative inline-flex items-center justify-center w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fuji-accent focus:ring-offset-2 shadow-md hover:shadow-lg ${
                isDarkMode 
                    ? 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500' 
                    : 'bg-gradient-to-r from-fuji-surface to-gray-200 hover:from-gray-200 hover:to-gray-300'
            } ${className}`}
            aria-label="Toggle theme"
        >
            {/* Toggle Circle */}
            <span
                className={`inline-block w-6 h-6 rounded-full transition-all duration-300 transform ${
                    isDarkMode 
                        ? 'translate-x-3 bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-yellow-400/50' 
                        : '-translate-x-3 bg-gradient-to-br from-white to-gray-100 shadow-fuji-blue/20'
                } shadow-lg border-2 ${isDarkMode ? 'border-yellow-200' : 'border-fuji-blue/10'}`}
            >
                {/* Icon inside circle */}
                <span className="flex items-center justify-center w-full h-full">
                    {isDarkMode ? (
                        // Moon icon
                        <svg className="w-4 h-4 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        // Sun icon
                        <svg className="w-4 h-4 text-fuji-blue" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                    )}
                </span>
            </span>

            {/* Background icons */}
            <div className="absolute inset-0 flex items-center justify-between px-1">
                <svg className={`w-3 h-3 transition-opacity duration-300 ${isDarkMode ? 'opacity-30' : 'opacity-60'} text-yellow-500`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                <svg className={`w-3 h-3 transition-opacity duration-300 ${isDarkMode ? 'opacity-60' : 'opacity-30'} text-gray-400`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" clipRule="evenodd" />
                </svg>
            </div>
        </button>
    );
};

export default ThemeToggle;
