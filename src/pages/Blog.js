import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";
import { Helmet } from 'react-helmet';
import { BLOG_POSTS } from '../data/blogPosts';
import BlogCard from '../components/BlogCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import '../styles/blog.css';

const Blog = () => {
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next');
  const isRTL = currentLanguageCode === 'ar';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);

  const categories = [
    { id: 'all', nameEN: 'All Posts', nameAR: 'جميع المقالات' },
    { id: 'maintenance', nameEN: 'Maintenance', nameAR: 'صيانة' },
    { id: 'technology', nameEN: 'Technology', nameAR: 'تقنية' },
    { id: 'safety', nameEN: 'Safety', nameAR: 'سلامة' }
  ];

  useEffect(() => {
    let filtered = BLOG_POSTS;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => {
        const title = isRTL ? post.titleAR : post.titleEN;
        const excerpt = isRTL ? post.excerptAR : post.excerptEN;
        const keywords = isRTL ? post.seoKeywordsAR : post.seoKeywords;
        
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
               keywords.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, isRTL]);

  const handlePostClick = (postId) => {
    window.location.href = `/blog/${postId}`;
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <title>{isRTL ? 'مدونة FUJI FD - نصائح وأخبار المصاعد' : 'FUJI FD Blog - Elevator Tips & News'}</title>
        <meta name="description" content={isRTL ? 
          'اكتشف أحدث النصائح والأخبار حول المصاعد والصيانة والتقنيات الحديثة من خبراء FUJI FD' :
          'Discover the latest elevator tips, news, maintenance guides, and modern technologies from FUJI FD experts'
        } />
        <meta name="keywords" content={isRTL ?
          'مدونة المصاعد, نصائح المصاعد, صيانة المصاعد, تقنية المصاعد, FUJI FD' :
          'elevator blog, elevator tips, elevator maintenance, elevator technology, FUJI FD'
        } />
        <meta property="og:title" content={isRTL ? 'مدونة FUJI FD' : 'FUJI FD Blog'} />
        <meta property="og:description" content={isRTL ?
          'اكتشف أحدث النصائح والأخبار حول المصاعد' :
          'Discover the latest elevator tips and news'
        } />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fujifd.com/blog" />
      </Helmet>

      <div className="min-h-screen bg-fuji-bg pt-20">
        {/* Hero Section */}
        <section className="bg-fuji-blue text-white py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
            <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
            <div className={`text-center ${isRTL ? 'font-cairo' : ''}`}>
              {/* Blog Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                {isRTL ? 'مدونة FUJI FD' : 'FUJI FD Blog'}
              </h1>
              <p className="text-lg lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                {isRTL ? 
                  'اكتشف أحدث النصائح والأخبار حول المصاعد والصيانة والتقنيات الحديثة من خبراء FUJI FD' :
                  'Discover the latest elevator tips, maintenance guides, and modern technologies from FUJI FD experts'
                }
              </p>
              
              {/* Stats */}
              <div className={`flex justify-center gap-8 mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="text-center">
                  <div className="text-2xl font-bold">{BLOG_POSTS.length}+</div>
                  <div className="text-sm text-white/80">{isRTL ? 'مقالات' : 'Articles'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-white/80">{isRTL ? 'فئات' : 'Categories'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm text-white/80">{isRTL ? 'نصائح' : 'Tips'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-gradient-to-r from-fuji-surface to-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className={`flex flex-col lg:flex-row gap-8 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                  <MagnifyingGlassIcon className="h-6 w-6 text-fuji-blue" />
                </div>
                <input
                  type="text"
                  placeholder={isRTL ? 'البحث في المقالات والنصائح...' : 'Search articles and tips...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-12 pl-6 font-cairo text-right' : 'pl-12 pr-6 text-left'} py-4 border-2 border-fuji-blue/20 rounded-2xl focus:ring-4 focus:ring-fuji-accent/20 focus:border-fuji-accent transition-all duration-300 shadow-lg hover:shadow-xl bg-white`}
                />
              </div>

              {/* Category Filter */}
              <div className={`flex gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                      selectedCategory === category.id
                        ? 'bg-fuji-accent text-white shadow-xl scale-105'
                        : 'bg-white text-fuji-blue border-2 border-fuji-blue/20 hover:bg-fuji-accent hover:text-white hover:border-fuji-accent'
                    } ${isRTL ? 'font-cairo' : ''}`}
                  >
                    {isRTL ? category.nameAR : category.nameEN}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search Results Info */}
            {searchTerm && (
              <div className={`mt-6 text-center ${isRTL ? 'font-cairo' : ''}`}>
                <p className="text-fuji-muted">
                  {isRTL ? 
                    `تم العثور على ${filteredPosts.length} مقال${filteredPosts.length !== 1 ? 'ات' : ''} للبحث "${searchTerm}"` :
                    `Found ${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} for "${searchTerm}"`
                  }
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    onClick={handlePostClick}
                  />
                ))}
              </div>
            ) : (
              <div className={`text-center py-16 ${isRTL ? 'font-cairo' : ''}`}>
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-fuji-blue mb-2">
                  {isRTL ? 'لا توجد مقالات' : 'No Articles Found'}
                </h3>
                <p className="text-fuji-muted">
                  {isRTL ? 'جرب البحث بكلمات مختلفة أو اختر تصنيف آخر' : 'Try searching with different keywords or select another category'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-16 bg-fuji-surface">
          <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
            <div className={isRTL ? 'font-cairo' : ''}>
              <h2 className="text-3xl font-bold text-fuji-blue mb-4">
                {isRTL ? 'اشترك في النشرة الإخبارية' : 'Subscribe to Our Newsletter'}
              </h2>
              <p className="text-fuji-muted mb-8">
                {isRTL ? 
                  'احصل على أحدث المقالات والنصائح حول المصاعد مباشرة في بريدك الإلكتروني' :
                  'Get the latest elevator articles and tips delivered directly to your inbox'
                }
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <input
                  type="email"
                  placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email address'}
                  className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuji-accent focus:border-transparent ${isRTL ? 'font-cairo text-right' : ''}`}
                />
                <button className={`px-6 py-3 bg-fuji-accent text-white font-semibold rounded-xl hover:bg-red-600 transition-colors duration-300 ${isRTL ? 'font-cairo' : ''}`}>
                  {isRTL ? 'اشترك' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
