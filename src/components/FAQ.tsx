
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book an appointment with a doctor?",
      answer: "Simply sign up for an account, browse our list of certified doctors, select your preferred specialist, and choose an available time slot. You'll receive a confirmation with video call details."
    },
    {
      question: "Is my medical information secure?",
      answer: "Absolutely! We use bank-level encryption and are fully HIPAA compliant. Your medical records and personal information are stored securely and only accessible to you and your chosen healthcare providers."
    },
    {
      question: "What should I do if I have a medical emergency?",
      answer: "For life-threatening emergencies, please call 911 immediately. Arogya Care is designed for non-emergency consultations, routine check-ups, and follow-up appointments."
    },
    {
      question: "Can I get prescriptions through video consultations?",
      answer: "Yes, our licensed doctors can prescribe medications during video consultations when medically appropriate. Prescriptions are sent electronically to your preferred pharmacy."
    },
    {
      question: "What devices are compatible with Arogya Care?",
      answer: "Our platform works on any device with a camera and internet connection - smartphones, tablets, laptops, and desktop computers. We support all major web browsers."
    },
    {
      question: "How much do consultations cost?",
      answer: "Consultation fees vary by specialty and duration. We offer transparent pricing with no hidden fees. Many insurance plans are accepted, and we also offer affordable self-pay options."
    },
    {
      question: "Can I upload and share my medical records?",
      answer: "Yes! You can securely upload lab results, imaging studies, and previous medical records. These can be shared with your doctors during consultations for better care coordination."
    },
    {
      question: "What if I need to reschedule my appointment?",
      answer: "You can easily reschedule appointments through your patient dashboard up to 2 hours before the scheduled time. Emergency cancellations are also accommodated."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-arogya-teal">
            Get answers to common questions about our digital healthcare platform
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-arogya-light-blue rounded-2xl px-6 border-0"
            >
              <AccordionTrigger className="text-left text-arogya-dark-teal font-semibold py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-arogya-teal pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
