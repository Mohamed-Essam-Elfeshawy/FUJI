// import { t } from 'i18next';
import React, { useState, useEffect } from 'react';
import { Our_Designs_Data } from './Data';
import cookies from "js-cookie";
import { useTranslation } from 'react-i18next';
import MultilineText from './MultilineText';

const OurDesigns = () => {
    const [selectedCategory, setSelectedCategory] = useState('Cabins');
    const [hoveredImage, setHoveredImage] = useState(null);
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';
    const { t } = useTranslation();

    // Get selected category data
    const selectedCategoryData = Our_Designs_Data.find(category => category.id === selectedCategory);

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className={`text-4xl lg:text-5xl font-bold text-fujiBlue mb-6 ${isRTL ? 'font-cairo' : ''}`}>
                        {t('Our_Designs')}
                    </h2>
                    <p className={`text-lg text-[#C0392B] max-w-3xl mx-auto leading-relaxed ${isRTL ? 'font-cairo' : ''}`}>
                        {isRTL 
                            ? 'استكشف مجموعتنا المتنوعة من التصاميم الحديثة والأنيقة التي تلبي جميع احتياجاتك'
                            : 'Explore our diverse collection of modern and elegant designs that meet all your needs'
                        }
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {Our_Designs_Data.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                                selectedCategory === category.id
                                    ? 'bg-brandRed text-white shadow-lg shadow-brandRed/30 transform scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-brandRed/10 hover:text-brandRed hover:shadow-md'
                            } ${isRTL ? 'font-cairo' : ''}`}
                        >
                            {isRTL ? category.titleAR : category.titleEN}
                        </button>
                    ))}
                </div>

                {/* Selected Category Info */}
                {selectedCategoryData && (
                    <div className="text-center mb-12">
                        <h3 className={`text-2xl lg:text-3xl font-bold text-fujiBlue mb-4 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? selectedCategoryData.titleAR : selectedCategoryData.titleEN}
                        </h3>
                        <p 
                            className={`text-[#C0392B] max-w-2xl mx-auto ${isRTL ? 'font-cairo' : ''}`}
                            dangerouslySetInnerHTML={{ 
                                __html: isRTL ? selectedCategoryData.descriptionAR : selectedCategoryData.descriptionEN 
                            }}
                        />
                    </div>
                )}

                {/* Gallery Grid */}
                {selectedCategoryData && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {selectedCategoryData.images.map((image, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-3xl bg-white shadow-soft hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                                onMouseEnter={() => setHoveredImage(`${selectedCategory}-${index}`)}
                                onMouseLeave={() => setHoveredImage(null)}
                            >
                                {/* Image */}
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={image}
                                        alt={`${selectedCategoryData.titleEN} ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                                        hoveredImage === `${selectedCategory}-${index}` ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                        <div className="absolute bottom-6 left-6 right-6 text-white">
                                            <h4 className={`text-lg font-bold mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                                {selectedCategoryData.titlesEN && selectedCategoryData.titlesEN[index] 
                                                    ? (isRTL ? selectedCategoryData.titlesAR[index] : selectedCategoryData.titlesEN[index])
                                                    : `${isRTL ? selectedCategoryData.titleAR : selectedCategoryData.titleEN} ${index + 1}`
                                                }
                                            </h4>
                                            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                <span className={`text-sm opacity-90 ${isRTL ? 'font-cairo' : ''}`}>
                                                    {isRTL ? 'عرض المزيد' : 'View More'}
                                                </span>
                                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    <h4 className={`text-lg font-semibold text-fujiBlue mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                        {selectedCategoryData.titlesEN && selectedCategoryData.titlesEN[index] 
                                            ? (isRTL ? selectedCategoryData.titlesAR[index] : selectedCategoryData.titlesEN[index])
                                            : `${isRTL ? selectedCategoryData.titleAR : selectedCategoryData.titleEN} ${index + 1}`
                                        }
                                    </h4>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm text-gray-500 ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? 'تصميم متميز' : 'Premium Design'}
                                        </span>
                                        <div className="w-8 h-8 bg-brandRed/10 rounded-full flex items-center justify-center group-hover:bg-brandRed group-hover:text-white transition-all duration-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Browse More CTA */}
                {selectedCategoryData && selectedCategoryData.link && (
                    <div className="text-center">
                        <button
                            onClick={() => window.open(selectedCategoryData.link, '_blank')}
                            className={`px-8 py-4 bg-gradient-to-r from-brandRed to-red-600 hover:from-red-600 hover:to-red-700 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${isRTL ? 'font-cairo' : ''}`}
                        >
                            {isRTL ? 'تصفح جميع التصاميم' : 'Browse All Designs'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OurDesigns;
