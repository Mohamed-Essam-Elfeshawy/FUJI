import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";
import { Helmet } from 'react-helmet';
import { BLOG_POSTS } from '../data/blogPosts';
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import '../styles/blog.css';

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next');
  const isRTL = currentLanguageCode === 'ar';
  
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const foundPost = BLOG_POSTS.find(p => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
      
      // Get related posts (same category, excluding current post)
      const related = BLOG_POSTS
        .filter(p => p.id !== postId && p.category === foundPost.category)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [postId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isRTL 
      ? date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: isRTL ? post.titleAR : post.titleEN,
          text: isRTL ? post.excerptAR : post.excerptEN,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(isRTL ? 'تم نسخ الرابط!' : 'Link copied!');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-fuji-bg flex items-center justify-center">
        <div className={`text-center ${isRTL ? 'font-cairo' : ''}`}>
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-fuji-blue mb-2">
            {isRTL ? 'المقال غير موجود' : 'Article Not Found'}
          </h2>
          <p className="text-fuji-muted mb-6">
            {isRTL ? 'المقال الذي تبحث عنه غير متوفر' : 'The article you are looking for is not available'}
          </p>
          <button
            onClick={() => navigate('/blog')}
            className={`px-6 py-3 bg-fuji-accent text-white font-semibold rounded-xl hover:bg-red-600 transition-colors duration-300 ${isRTL ? 'font-cairo' : ''}`}
          >
            {isRTL ? 'العودة للمدونة' : 'Back to Blog'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isRTL ? post.titleAR : post.titleEN} | FUJI FD Blog</title>
        <meta name="description" content={isRTL ? post.excerptAR : post.excerptEN} />
        <meta name="keywords" content={isRTL ? post.seoKeywordsAR : post.seoKeywords} />
        <meta name="author" content={isRTL ? post.authorAR : post.author} />
        <meta property="og:title" content={isRTL ? post.titleAR : post.titleEN} />
        <meta property="og:description" content={isRTL ? post.excerptAR : post.excerptEN} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={isRTL ? post.authorAR : post.author} />
        <meta property="article:section" content={isRTL ? post.categoryAR : post.category} />
        {(isRTL ? post.tagsAR : post.tags).map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`https://fujifd.com/blog/${post.id}`} />
      </Helmet>

      <div className="min-h-screen bg-fuji-bg">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-16 py-4">
            <button
              onClick={() => navigate('/blog')}
              className={`flex items-center gap-2 text-fuji-blue hover:text-fuji-accent transition-colors duration-300 ${isRTL ? 'flex-row-reverse font-cairo' : ''}`}
            >
              <ArrowLeftIcon className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              <span>{isRTL ? 'العودة للمدونة' : 'Back to Blog'}</span>
            </button>
          </div>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-6 lg:px-16 py-12">
          {/* Category Badge */}
          <div className={`mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="bg-fuji-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
              {isRTL ? post.categoryAR : post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className={`text-3xl lg:text-4xl font-bold text-fuji-blue mb-6 leading-tight ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
            {isRTL ? post.titleAR : post.titleEN}
          </h1>

          {/* Meta Info */}
          <div className={`flex flex-wrap items-center gap-6 text-fuji-muted mb-8 ${isRTL ? 'flex-row-reverse font-cairo' : ''}`}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <UserIcon className="w-5 h-5" />
              <span>{isRTL ? post.authorAR : post.author}</span>
            </div>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CalendarIcon className="w-5 h-5" />
              <span>{formatDate(post.publishDate)}</span>
            </div>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ClockIcon className="w-5 h-5" />
              <span>{post.readTime} {isRTL ? 'دقائق قراءة' : 'min read'}</span>
            </div>
            <button
              onClick={handleShare}
              className={`flex items-center gap-2 text-fuji-accent hover:text-red-600 transition-colors duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ShareIcon className="w-5 h-5" />
              <span>{isRTL ? 'مشاركة' : 'Share'}</span>
            </button>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={post.image} 
              alt={isRTL ? post.titleAR : post.titleEN}
              className="w-full h-64 lg:h-96 object-cover"
            />
          </div>

          {/* Article Content */}
          <div 
            className={`prose prose-lg max-w-none mb-12 ${isRTL ? 'prose-rtl font-cairo text-right' : 'text-left'}`}
            dangerouslySetInnerHTML={{ 
              __html: isRTL ? post.contentAR : post.contentEN 
            }}
          />

          {/* Tags */}
          <div className={`mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className={`text-lg font-semibold text-fuji-blue mb-4 ${isRTL ? 'font-cairo' : ''}`}>
              {isRTL ? 'الكلمات المفتاحية:' : 'Tags:'}
            </h3>
            <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {(isRTL ? post.tagsAR : post.tags).map((tag, index) => (
                <span 
                  key={index}
                  className={`bg-fuji-surface text-fuji-blue px-3 py-2 rounded-lg font-medium hover:bg-fuji-accent hover:text-white transition-colors duration-300 cursor-pointer ${isRTL ? 'font-cairo' : ''}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-fuji-surface py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
              <h2 className={`text-3xl font-bold text-fuji-blue mb-8 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                {isRTL ? 'مقالات ذات صلة' : 'Related Articles'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <div 
                    key={relatedPost.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                    onClick={() => navigate(`/blog/${relatedPost.id}`)}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={isRTL ? relatedPost.titleAR : relatedPost.titleEN}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <h3 className={`text-xl font-bold text-fuji-blue mb-2 line-clamp-2 ${isRTL ? 'font-cairo' : ''}`}>
                        {isRTL ? relatedPost.titleAR : relatedPost.titleEN}
                      </h3>
                      <p className={`text-fuji-muted line-clamp-2 ${isRTL ? 'font-cairo' : ''}`}>
                        {isRTL ? relatedPost.excerptAR : relatedPost.excerptEN}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BlogPost;
