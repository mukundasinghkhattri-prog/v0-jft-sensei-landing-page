"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is JFT SENSEI?",
    answer: "JFT SENSEI is an AI-powered exam preparation platform designed specifically for JFT (Japanese Foundation Test) candidates. We provide realistic mock tests, AI speaking practice, and comprehensive analytics to help you pass your exam on the first attempt.",
  },
  {
    question: "How realistic are the mock tests?",
    answer: "Our mock tests are designed to closely replicate the actual JFT exam experience. They include the same question types, time limits, and CBT (Computer-Based Testing) interface you'll encounter on exam day. Many students report that the real exam felt familiar after practicing with us.",
  },
  {
    question: "Can I use JFT SENSEI on my mobile phone?",
    answer: "Yes! Our platform is fully responsive and works great on mobile devices, tablets, and desktop computers. You can practice anytime, anywhere with our mobile-friendly CBT interface.",
  },
  {
    question: "How does the AI speaking practice work?",
    answer: "Our AI speaking practice uses advanced speech recognition to evaluate your pronunciation, fluency, and grammar. You'll have conversations with our AI tutor who provides instant feedback and suggestions for improvement.",
  },
  {
    question: "What's included in the free trial?",
    answer: "The 7-day trial includes access to 2 full mock tests, 500+ practice questions, basic performance analytics, and mobile app access. It's the perfect way to experience our platform before committing to a subscription.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "We offer a 7-day money-back guarantee on all paid subscriptions. If you're not completely satisfied with our platform, contact our support team within 7 days for a full refund.",
  },
  {
    question: "How is my progress tracked?",
    answer: "Our platform tracks your performance across all practice sessions, identifying your weak points and areas for improvement. You'll get detailed analytics showing your progress over time, accuracy by topic, and personalized study recommendations.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data security seriously. All your personal information and practice data is encrypted and stored securely. We never share your data with third parties without your explicit consent.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1a2e6e]/10 px-4 py-1.5 text-sm font-medium text-[#1a2e6e]">
            FAQ
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
              <AccordionTrigger className="py-5 text-left text-base font-medium text-gray-900 hover:text-[#1a2e6e] hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
