"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  return (
    <div className="bg-slate-800/50 rounded-lg xl:rounded-xl hover:bg-slate-800/70 transition-all duration-200 shadow-sm hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-left flex items-center justify-between hover:bg-slate-800/30 transition-colors duration-200 rounded-lg xl:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-slate-900"
        aria-expanded={isOpen}
      >
        <h3 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl pr-3 sm:pr-4 text-white leading-snug flex-1">
          {question}
        </h3>
        <div className={`flex-shrink-0 transition-transform duration-300 ease-in-out ml-2 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
        </div>
      </button>
      <div 
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          height: isOpen ? `${contentHeight}px` : '0px',
          opacity: isOpen ? 1 : 0
        }}
      >
        <div ref={contentRef} className="px-3 sm:px-4 md:px-5 lg:px-6">
          <div className="border-t border-slate-700 pt-3 sm:pt-4 md:pt-5 pb-3 sm:pb-4 md:pb-5 lg:pb-6">
            <p className="text-slate-300 transition-colors duration-200 leading-relaxed text-sm sm:text-base md:text-lg whitespace-pre-line">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FAQSection({ faqs, title = "Frequently Asked Questions" }) {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  // Demo data if no faqs provided
  const defaultFaqs = [
    {
      question: "How do I get started with your service?",
      answer: "Getting started is easy! Simply sign up for an account, choose your plan, and follow our onboarding guide. Our support team is available 24/7 to help you through the process."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll continue to have access to your account until the end of your billing period."
    },
    {
      question: "Do you offer customer support?",
      answer: "We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our dedicated support team is here to help you with any questions or issues you might have."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use industry-standard encryption and security measures to protect your data. Our servers are hosted in secure data centers and we regularly undergo security audits to ensure your information remains safe."
    }
  ];

  const faqData = faqs || defaultFaqs;

  return (
    <section className="w-full mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-32 bg-black py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 rounded-lg sm:rounded-xl md:rounded-2xl">
      <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 md:mb-4 text-white leading-tight">
          {title}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm md:text-base lg:text-lg max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0">
          Find answers to common questions about our services and processes.
        </p>
      </div>
      
      <div className="max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto space-y-2 sm:space-y-3 md:space-y-4">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openItem === index}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </section>
  );
}