import React from 'react';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';

const BlogCard = ({ post, onClick }) => {
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next');
  const isRTL = currentLanguageCode === 'ar';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isRTL 
      ? date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <article 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100"
      onClick={() => onClick(post.id)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={isRTL ? post.titleAR : post.titleEN}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-fuji-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
            {isRTL ? post.categoryAR : post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Title */}
        <h3 className={`text-xl font-bold text-fuji-blue mb-3 line-clamp-2 group-hover:text-fuji-accent transition-colors duration-300 ${isRTL ? 'font-cairo' : ''}`}>
          {isRTL ? post.titleAR : post.titleEN}
        </h3>

        {/* Excerpt */}
        <p className={`text-fuji-muted mb-4 line-clamp-3 leading-relaxed ${isRTL ? 'font-cairo' : ''}`}>
          {isRTL ? post.excerptAR : post.excerptEN}
        </p>

        {/* Meta Info */}
        <div className={`flex items-center gap-4 text-sm text-fuji-muted mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <CalendarIcon className="w-4 h-4" />
            <span className={isRTL ? 'font-cairo' : ''}>{formatDate(post.publishDate)}</span>
          </div>
          <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <ClockIcon className="w-4 h-4" />
            <span className={isRTL ? 'font-cairo' : ''}>
              {post.readTime} {isRTL ? 'دقائق قراءة' : 'min read'}
            </span>
          </div>
          <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <UserIcon className="w-4 h-4" />
            <span className={isRTL ? 'font-cairo' : ''}>{isRTL ? post.authorAR : post.author}</span>
          </div>
        </div>

        {/* Tags */}
        <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {(isRTL ? post.tagsAR : post.tags).slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className={`bg-fuji-surface text-fuji-blue px-2 py-1 rounded-lg text-xs font-medium ${isRTL ? 'font-cairo' : ''}`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More */}
        <div className={`mt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className={`text-fuji-accent font-semibold text-sm group-hover:underline ${isRTL ? 'font-cairo' : ''}`}>
            {isRTL ? 'اقرأ المزيد ←' : 'Read More →'}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
