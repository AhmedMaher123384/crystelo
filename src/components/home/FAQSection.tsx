// === بداية قسم: التصدير ===
import React, { useState } from 'react';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// === الأنواع (كما هي، بدون تغيير) ===
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: number;
  title: string;
  // ✅ icon removed — no icons used anywhere
  faqs: FAQ[];
}

// === المكون: FAQSection — v2 — Ultra-Elegant Vertical Layout ===
const FAQSection: React.FC = () => {
  const { t } = useTranslation();

  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleCategory = (id: number) => {
    setOpenCategory(openCategory === id ? null : id);
    if (openCategory !== id) setOpenFAQ(null);
  };

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // ✅ البيانات كما هي — فقط حُذفت حقول `icon`
  const faqCategories: FAQCategory[] = [
    {
      id: 1,
      title: 'الطلبات والتوصيل والشحن',
      faqs: [
        {
          id: 1,
          question: 'كم يستغرق توصيل الطلب؟',
          answer: 'داخل المدن الرئيسية عادة 1–3 أيام عمل، وخارجها 3–7 أيام. الشحن الدولي يستغرق 7–14 يوم عمل حسب الوجهة وشركة الشحن. يمكنك تتبُّع طلبك من صفحة الطلبات.',
        },
        {
          id: 2,
          question: 'هل يوجد شحن سريع أو في نفس اليوم؟',
          answer: 'نوفر خيارات شحن سريع في بعض المدن برسوم إضافية. ستظهر لك الخيارات المتاحة أثناء إنهاء الدفع.',
        },
        {
          id: 3,
          question: 'كيف أتتبع شحنتي؟',
          answer: 'نُرسل لك رقم التتبع عبر البريد الإلكتروني والواتساب فور شحن الطلب، ويمكنك الاطلاع عليه من لوحة حسابك.',
        },
      ],
    },
    {
      id: 2,
      title: 'الاستبدال والاسترجاع',
      faqs: [
        {
          id: 4,
          question: 'هل يمكنني استبدال أو استرجاع الإكسسوارات؟',
          answer: 'نقبل الاستبدال/الاسترجاع خلال 7 أيام من الاستلام للإكسسوارات غير المستخدمة وبحالتها الأصلية مع الفاتورة. المنتجات المستخدمة أو بدون تغليف أصلي غير قابلة للاسترجاع حفاظاً على الجودة والسلامة.',
        },
        {
          id: 5,
          question: 'وصلني منتج خاطئ أو تالف، ماذا أفعل؟',
          answer: 'تواصل معنا خلال 48 ساعة وارفق صور المنتج، وسنرتّب استبدالاً أو استرجاعاً مجانياً حسب الحالة.',
        },
        {
          id: 6,
          question: 'كم يستغرق استرداد المبلغ؟',
          answer: 'يتم الاسترداد خلال 3–7 أيام عمل عبر نفس وسيلة الدفع المستخدمة في الطلب.',
        },
      ],
    },
    {
      id: 3,
      title: 'الإكسسوارات والأصالة والجودة',
      faqs: [
        {
          id: 7,
          question: 'هل منتجاتكم أصلية؟',
          answer: 'جميع إكسسواراتنا أصلية 100% ومختارة بعناية، ونوفّر فاتورة وضمان على الجودة.',
        },
        {
          id: 8,
          question: 'ما المواد والخامات المستخدمة؟',
          answer: 'تختلف الخامات حسب المنتج: معادن مطلية، ستانلس ستيل، جلد طبيعي، وأقمشة عالية الجودة. راجع وصف المنتج للتفاصيل.',
        },
        {
          id: 9,
          question: 'هل توجد خيارات مقاومة للماء أو خالية من النيكل؟',
          answer: 'نوفر منتجات مقاومة للماء أو خالية من النيكل عند توفرها. راجع وصف المنتج أو تواصل معنا للتأكد.',
        },
      ],
    },
    {
      id: 4,
      title: 'الدفع والعروض',
      faqs: [
        {
          id: 10,
          question: 'ما طرق الدفع المتاحة؟',
          answer: 'نوفر الدفع عبر البطاقات البنكية، Apple Pay، التحويل البنكي، وقد يتوفر الدفع عند الاستلام في بعض المدن.',
        },
        {
          id: 11,
          question: 'هل توجد عروض أو كوبونات؟',
          answer: 'نعم، نعلن عن العروض والكوبونات بشكل دوري. أدخل الكود في خانة الخصم أثناء الدفع للاستفادة منه.',
        },
        {
          id: 12,
          question: 'هل أحصل على فاتورة؟',
          answer: 'نعم، ترسل الفاتورة إلكترونياً وتُرفق مع الطلب عند الحاجة.',
        },
      ],
    },
    {
      id: 5,
      title: 'الهدايا والتغليف',
      faqs: [
        {
          id: 13,
          question: 'هل توفّرون تغليف هدايا؟',
          answer: 'نوفر خيارات تغليف هدايا أنيقة وبطاقات إهداء يمكن اختيارها أثناء الدفع.',
        },
        {
          id: 14,
          question: 'هل يمكن كتابة رسالة مع الهدية؟',
          answer: 'بالتأكيد، اكتب رسالتك وسيتم إرفاقها مع التغليف.',
        },
        {
          id: 15,
          question: 'هل يمكن شحن الطلب لعنوان مختلف؟',
          answer: 'نعم، يمكنك إدخال عنوان المستلم أثناء إتمام الدفع وسنُرسل الهدية مباشرةً.',
        },
      ],
    },
    {
      id: 6,
      title: 'نصائح الاستخدام والحفظ',
      faqs: [
        {
          id: 16,
          question: 'كيف أحافظ على لمعان الإكسسوارات؟',
          answer: 'تجنّب الماء والعطور المباشرة؛ خزّن الإكسسوارات في علبة محكمة وبعيداً عن الرطوبة.',
        },
        {
          id: 17,
          question: 'كيف أحفظ الحقائب والمحافظ؟',
          answer: 'احفظها بعيداً عن الشمس والحرارة، ونظّفها بمنتجات مخصصة للخامات، وخزّنها في أكياس قماش.',
        },
        {
          id: 18,
          question: 'هل تسبب بعض الإكسسوارات حساسية؟',
          answer: 'قد يسبب النيكل حساسية لدى بعض الأشخاص. اختر منتجات خالية من النيكل وأجرِ اختباراً بسيطاً قبل الاستخدام.',
        },
      ],
    },
  ];

  return (
    <section 
      className="py-16 sm:py-20 bg-gradient-to-b from-white to-[#fff9f7] relative overflow-hidden"
      data-section="faq"
      aria-labelledby="faq-heading"
    >
      {/* ✨ عنصر زخرفي خفيف — خط ناعم عمودي يُوحّد التسلسل */}
      <div 
        className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#d9a890]/20 to-transparent transform -translate-x-1/2 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* === العنوان الرئيسي — فاخر، بتركيز بصري على اللون #d9a890 === */}
        <div className="text-center mb-16 relative">
          <h2 
            id="faq-heading"
            className="text-3xl sm:text-4xl font-light tracking-tight text-[#0A2A55]"
          >
            {t('home.faq.frequent_questions', { defaultValue: 'الأسئلة الشائعة' })}
          </h2>
          <div className="mt-5 w-24 h-0.5 mx-auto bg-[#d9a890] rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            {t('home.faq.subtitle', {
              defaultValue: 'إجابات منظمة حول الطلبات والشحن والاستبدال والإكسسوارات',
            })}
          </p>
        </div>

        {/* === القائمة العمودية الرتيبة — بدون شبكات، بدون أيقونات، فقط أناقة === */}
        <div className="space-y-10">
          {faqCategories.map((category) => (
            <div 
              key={category.id} 
              className="relative group"
            >
              {/* --- خط الاتصال الرأسي (جزئي، فقط عند الفئة المفتوحة أو المجاورة) --- */}
              {openCategory === category.id && (
                <div 
                  className="absolute left-0 top-0 w-0.5 h-full bg-[#d9a890] rounded-full opacity-50"
                  aria-hidden="true"
                />
              )}

              {/* --- رأس الفئة — نحيف، أنيق، مع إشارة بصرية لطيفة عند التمرير/Focus --- */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full text-left py-4 px-6 rounded-xl transition-all duration-400
                  ${openCategory === category.id 
                    ? 'bg-white border border-[#d9a890]/20 shadow-sm' 
                    : 'bg-transparent hover:bg-[#fdf8f6]'}
                  focus:outline-none focus:ring-2 focus:ring-[#d9a890]/30`}
                aria-expanded={openCategory === category.id}
                aria-controls={`faq-category-${category.id}`}
              >
                <div className="flex items-center justify-between">
                  <span 
                    className={`text-lg font-medium tracking-wide transition-colors duration-300
                      ${openCategory === category.id 
                        ? 'text-[#0A2A55]' 
                        : 'text-gray-800 group-hover:text-[#0A2A55]'}`}
                  >
                    {category.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#d9a890] transform transition-transform duration-300
                      ${openCategory === category.id ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* --- محتوى الفئة (الأسئلة) — يظهر بسلاسة عند الفتح --- */}
              {openCategory === category.id && (
                <div 
                  id={`faq-category-${category.id}`}
                  className="mt-4 pl-6 border-l-2 border-[#d9a890]/20 space-y-5"
                  aria-live="polite"
                >
                  {category.faqs.map((faq) => (
                    <div 
                      key={faq.id}
                      className={`transition-all duration-400 ${
                        openFAQ === faq.id ? 'opacity-100' : 'opacity-95'
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className={`w-full text-left py-3 px-5 rounded-lg flex justify-between items-start
                          transition-colors duration-300
                          ${openFAQ === faq.id 
                            ? 'bg-[#fdf8f6] shadow-sm' 
                            : 'hover:bg-[#fefcfa]'}`}
                        aria-expanded={openFAQ === faq.id}
                        aria-controls={`faq-answer-${faq.id}`}
                      >
                        <span 
                          className={`text-base font-normal text-gray-800 leading-relaxed
                            ${openFAQ === faq.id 
                              ? 'font-medium text-[#0A2A55]' 
                              : 'group-hover:text-gray-900'}`}
                        >
                          {faq.question}
                        </span>
                        <span className="ml-3 flex-shrink-0">
                          {openFAQ === faq.id ? (
                            <Minus className="w-4 h-4 text-[#d9a890]" />
                          ) : (
                            <Plus className="w-4 h-4 text-[#d9a890]" />
                          )}
                        </span>
                      </button>

                      {openFAQ === faq.id && (
                        <div
                          id={`faq-answer-${faq.id}`}
                          className="mt-3 ml-10 pr-2"
                          role="region"
                        >
                          <p className="text-gray-600 leading-relaxed font-light text-sm sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ✨ لمسة نهائية: زخرفة خفيفة في الأسفل — لتعزيز الطابع الراقي */}
        <div 
          className="mt-20 text-center opacity-10"
          aria-hidden="true"
        >
          <div className="w-20 h-px bg-[#d9a890] mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;