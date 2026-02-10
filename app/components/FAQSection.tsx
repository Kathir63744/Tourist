// app/components/FAQSection.tsx
"use client";

import { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Mail, MessageSquare } from 'lucide-react';

const faqCategories = [
  {
    id: 'booking',
    name: 'Booking & Reservations',
    icon: '📅',
    questions: [
      {
        q: 'How do I make a booking?',
        a: 'You can book directly through our website, mobile app, or by calling our reservation desk at +91 98765 43210.'
      },
      {
        q: 'What is your cancellation policy?',
        a: 'Free cancellation up to 7 days before check-in. 50% refund for cancellations 3-7 days before. No refund for cancellations within 48 hours.'
      },
      {
        q: 'Can I modify my booking?',
        a: 'Yes, you can modify your booking dates, room type, or number of guests by contacting our reservation team up to 48 hours before check-in.'
      },
      {
        q: 'Do you offer group discounts?',
        a: 'Yes, we offer special rates for groups of 10 or more. Contact our group booking department for customized packages.'
      }
    ]
  },
  {
    id: 'resort',
    name: 'Resort Facilities',
    icon: '🏨',
    questions: [
      {
        q: 'What amenities are included?',
        a: 'All resorts include WiFi, parking, breakfast, access to common areas, and basic recreational facilities. Some premium amenities may require additional fees.'
      },
      {
        q: 'Are pets allowed?',
        a: 'Yes, we are pet-friendly at select resorts with prior notification. Pet fee of ₹1000 per night applies.'
      },
      {
        q: 'Do you have swimming pools?',
        a: 'All our resorts feature swimming pools. Some have heated pools, infinity pools, or natural rock pools depending on location.'
      },
      {
        q: 'Is room service available?',
        a: 'Yes, 24/7 room service is available at all resorts with a comprehensive menu.'
      }
    ]
  },
  {
    id: 'travel',
    name: 'Travel & Transportation',
    icon: '🚗',
    questions: [
      {
        q: 'How do I reach the resorts?',
        a: 'Detailed directions will be provided upon booking. Most resorts are 2-3 hours drive from the nearest city with airport/train station pickup available.'
      },
      {
        q: 'Do you provide transportation?',
        a: 'Yes, we offer airport/train station transfers starting at ₹2000 one way. Private car and helicopter transfers also available.'
      },
      {
        q: 'Is parking available?',
        a: 'Complimentary parking is available at all resorts. Valet parking service is also offered.'
      },
      {
        q: 'What is the check-in/check-out time?',
        a: 'Check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in/late check-out may be available upon request.'
      }
    ]
  },
  {
    id: 'activities',
    name: 'Activities & Experiences',
    icon: '🎯',
    questions: [
      {
        q: 'What activities are available?',
        a: 'We offer guided treks, nature walks, bird watching, photography tours, cultural experiences, adventure sports, and wellness activities.'
      },
      {
        q: 'Are activities included in the package?',
        a: 'Basic activities like nature walks are included. Premium activities may have additional charges.'
      },
      {
        q: 'Do you organize tours?',
        a: 'Yes, we organize day tours to nearby attractions with experienced guides. Bookings can be made at the resort concierge.'
      },
      {
        q: 'What about children\'s activities?',
        a: 'We have dedicated kids\' clubs, playgrounds, and supervised activities for children aged 4-12.'
      }
    ]
  }
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('booking');
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev =>
      prev.includes(id)
        ? prev.filter(q => q !== id)
        : [...prev, id]
    );
  };

  const currentCategory = faqCategories.find(cat => cat.id === activeCategory);

  return (
    <section id="faq" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/40 to-emerald-500/40 backdrop-blur-lg border border-white/30 rounded-full text-sm font-medium text-white mb-4">
            <HelpCircle className="w-4 h-4" />
            Support & Information
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-white/95 max-w-2xl mx-auto text-lg">
            Find quick answers to common queries about bookings, facilities, and services
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center gap-3 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-teal-500/40 to-emerald-500/40 text-white border border-teal-500/30'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
              
              {/* Quick Help */}
              <div className="mt-8 p-6 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-2xl border border-teal-500/30">
                <h4 className="font-bold text-white mb-4">Need Immediate Help?</h4>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5 text-teal-400" />
                    <span className="text-white">Call Support</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <MessageSquare className="w-5 h-5 text-teal-400" />
                    <span className="text-white">Live Chat</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5 text-teal-400" />
                    <span className="text-white">Email Us</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/30 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="text-3xl">{currentCategory?.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentCategory?.name}</h3>
                  <p className="text-white/90">Common questions about this category</p>
                </div>
              </div>

              <div className="space-y-4">
                {currentCategory?.questions.map((question, idx) => {
                  const questionId = `${currentCategory.id}-${idx}`;
                  const isOpen = openQuestions.includes(questionId);
                  
                  return (
                    <div 
                      key={idx} 
                      className="bg-white/5 rounded-xl border border-white/20 hover:border-teal-500/30 transition-colors"
                    >
                      <button
                        onClick={() => toggleQuestion(questionId)}
                        className="w-full text-left p-6 flex justify-between items-center gap-4"
                      >
                        <h4 className="font-bold text-white text-lg flex-1">
                          {question.q}
                        </h4>
                        <ChevronDown className={`w-5 h-5 text-teal-400 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-white/90">{question.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Didn't find answer? */}
              <div className="mt-12 p-6 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-2xl border border-teal-500/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white mb-2">Didn't find your answer?</h4>
                    <p className="text-white/90">Contact our support team for personalized assistance</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors">
                      Contact Support
                    </button>
                    <button className="px-6 py-3 border border-teal-500 text-teal-400 font-semibold rounded-lg hover:bg-teal-500/10 transition-colors">
                      Browse All FAQs
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  title: 'Best Booking Time',
                  tip: 'Book 3-4 weeks in advance for best rates and availability',
                  icon: '⏰'
                },
                {
                  title: 'Packing Tips',
                  tip: 'Carry warm clothing, comfortable shoes, and rain gear',
                  icon: '🎒'
                },
                {
                  title: 'Travel Insurance',
                  tip: 'We recommend purchasing travel insurance for your trip',
                  icon: '🛡️'
                }
              ].map((tip, idx) => (
                <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/20 hover:border-teal-500/30 transition-colors">
                  <div className="text-3xl mb-3">{tip.icon}</div>
                  <h5 className="font-bold text-white mb-2">{tip.title}</h5>
                  <p className="text-white/80 text-sm">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}