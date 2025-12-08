import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import heroImage from '../../assets/hero.png';
import ArabicCollectionList from '../collections/ArabicCollectionList';
import { Link } from 'react-router-dom';
import { createCategorySlug } from '../../utils/slugify';
import { apiCall, API_ENDPOINTS, buildImageUrl } from '../../config/api';
import { getCategoryImage } from '../../assets/categoryImages';
import CategoryProductsPreview from '../categories/CategoryProductsPreview';

interface Category {
  id: number;
  name: string;
  name_ar?: string;
  name_en?: string;
  image?: string;
}

const AboutUsSection: React.FC = () => {
  const { i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('cachedCategories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const getCategoryName = (category: Category) => {
    const lang = i18n.language;
    if (lang === 'ar') {
      return category.name_ar || category.name_en || category.name || '';
    }
    return category.name_en || category.name_ar || category.name || '';
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiCall(API_ENDPOINTS.CATEGORIES);
        const list = Array.isArray(data) ? data : data?.data || [];
        setCategories(list);
        try {
          localStorage.setItem('cachedCategories', JSON.stringify(list));
        } catch {}
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    if (!categories || categories.length === 0) fetchCategories();
  }, []);

  // Filter out "Themes"
  const filteredCategories = categories.filter((cat) => {
    const name = getCategoryName(cat).toLowerCase();
    return name !== 'ثيمات' && name !== 'themes';
  });

  return (
    <section className="bg-white py-10 md:py-14">
      <style>{`
        /* تدرجات ألوان فريدة */
        .category-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #d9a89033 0%, #592a261a 100%);
          z-index: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .category-card:hover::before {
          opacity: 1;
        }

        /* تأثير الزجاج المُطفأ (frosted glass) */
        .category-label {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(89, 42, 38, 0.15);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        /* تأثير الصورة الذكي: قناع دائري مائل */
        .category-image-mask {
          mask-image: radial-gradient(circle at 30% 40%, black 55%, transparent 65%);
          -webkit-mask-image: radial-gradient(circle at 30% 40%, black 55%, transparent 65%);
          mask-size: 200% 200%;
          -webkit-mask-size: 200% 200%;
        }
        .category-card:hover .category-image-mask {
          mask-position: 100% 0%;
          -webkit-mask-position: 100% 0%;
          transition: mask-position 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* تأثير الورقة المرفوعة (elegant lift) */
        .category-card {
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                      box-shadow 0.4s ease;
        }
        .category-card:hover {
          transform: translateY(-8px) rotateX(2deg);
          box-shadow: 0 20px 30px -10px rgba(89, 42, 38, 0.12);
        }

        /* تأثير الدخول الانسيابي عند التمرير */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }
        .animate-delay-1 { animation-delay: 0.1s; }
        .animate-delay-2 { animation-delay: 0.18s; }
        .animate-delay-3 { animation-delay: 0.26s; }
        .animate-delay-4 { animation-delay: 0.34s; }
        .animate-delay-5 { animation-delay: 0.42s; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======== التصنيفات أولًا (مُعاد تصميمها بشكل عبقري) ======== */}
        <div className="mb-16" ref={containerRef}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                {i18n.language === 'ar' ? 'اكتشف عالمك' : 'Explore Your World'}
              </h2>
              <div 
                className="h-1 mt-2 rounded-full" 
                style={{ 
                  width: '3rem', 
                  background: 'linear-gradient(to right, #d9a890, #592a26)' 
                }}
              />
            </div>
          </div>

          {/* شبكة التصنيفات المبتكرة */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            aria-label="تصنيفات المنتجات"
          >
            {filteredCategories.map((category, idx) => {
              const name = getCategoryName(category);
              const to = `/category/${createCategorySlug(category.id, name)}`;
              const imageUrl = buildImageUrl(getCategoryImage(Number(category.id)) || category.image || '');

              return (
                <Link
                  key={category.id}
                  to={to}
                  className="category-card group block rounded-2xl overflow-hidden border border-transparent hover:border-[#592a26]/20 bg-white shadow-sm relative h-72 md:h-80"
                  aria-label={`تصفح ${name}`}
                >
                  {/* صورة التصنيف: عرض إبداعي بقناع ديناميكي */}
                  <div className="absolute inset-0">
                    {imageUrl ? (
                      <div className="w-full h-full overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={name}
                          className="category-image-mask w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) parent.style.backgroundColor = '#f8f5f3';
                          }}
                        />
                      </div>
                    ) : (
                      <div 
                        className="w-full h-full bg-gradient-to-br from-[#f8f5f3] to-[#e9e1db] flex items-center justify-center"
                        style={{ 
                          boxShadow: 'inset 0 0 0 1px rgba(89, 42, 38, 0.05)' 
                        }}
                      >
                        <span className="text-[#592a26]/30 font-medium text-lg">
                          {name}
                        </span>
                      </div>
                    )}

                    {/* تسمية التصنيف: أنيقة، مركزية، بتأثير زجاج */}
                    <div 
                      className="category-label absolute bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2.5 rounded-full text-center font-bold text-[#592a26] text-sm md:text-base whitespace-nowrap transition-all duration-300 group-hover:bottom-5"
                      style={{ 
                        minWidth: '8rem',
                        maxWidth: '12rem'
                      }}
                    >
                      {name}
                    </div>

                    {/* زاوية فنية (ornamental touch) */}
                    <div 
                      className="absolute top-4 right-4 w-8 h-8 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, #d9a890 30%, transparent 70%)',
                        opacity: 0.4,
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ======== باقي المحتوى (منقّح ليتماشى مع الإيقاع الجديد) ======== */}
        
        {/* آخر العروض */}
        <div className="mb-12 md:mb-14 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black">آخر العروض</h2>
              <div className="h-1 w-20 bg-[#592a26] rounded-full mt-2"></div>
            </div>
          </div>
          <ArabicCollectionList arabicName="آخر العروض" limit={5} />
        </div>

        {/* الجمعة البيضاء */}
        <div className="mb-10 md:mb-12 animate-fade-in-up animate-delay-1">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black">أحدث المنتجات</h2>
              <div className="h-1 w-20 bg-[#592a26] rounded-full mt-2"></div>
            </div>
          </div>
          <ArabicCollectionList arabicName="أحدث المنتجات" limit={5} />
        </div>

        {/* صورة الهيرو — الآن بتأثير مُحسّن */}
        <div className="mt-10 mb-12 animate-fade-in-up animate-delay-2">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={heroImage} 
              alt="عرض خاص" 
              className="w-full h-auto block"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            />
          </div>
        </div>

        {/* منتجات حسب التصنيف — الآن بتنسيق مُنظّف وأنيق */}
        <div className="space-y-10">
          {filteredCategories.map((category, idx) => {
            const name = getCategoryName(category);
            const to = `/category/${createCategorySlug(category.id, name)}`;
            return (
              <div 
                key={category.id} 
                className={`animate-fade-in-up animate-delay-${(idx % 5) + 1}`}
              >
                <div className="flex items-end justify-between mb-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-black">{name}</h3>
                  <Link 
                    to={to} 
                    className="text-[#592a26] font-medium text-sm md:text-base hover:text-[#d9a890] transition-colors"
                  >
                    عرض الكل
                  </Link>
                </div>
                <CategoryProductsPreview categoryId={category.id} limit={5} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;