import type { Metadata } from 'next';
import Link from 'next/link';
import { Mountain } from 'lucide-react';
import TouristNavbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Terms of Service | Zoy Tours',
  description: 'Read Zoy Tours terms of service for bookings, cancellations, payments, and guest policies for our properties in Valparai, Kotagiri, and Cherai.',
  keywords: 'Zoy Tours terms, booking terms, cancellation policy, guest rules, Valparai, Kotagiri, Cherai',
  openGraph: {
    title: 'Terms of Service | Zoy Tours',
    description: 'Terms and conditions for booking stays at Zoy Tours properties including Paradise View Stay, Hilltop Valparai, Aira Vista, Oak Valley Resort, and Cherai Beach Villa.',
    url: 'https://zoytours.com/terms-of-service',
    siteName: 'Zoy Tours',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zoytours.com/terms-of-service',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-4">
                {/* Background Image with Light Overlay */}
        <div className="fixed inset-0 -z-10">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ 
              backgroundImage: `url('/ba.jpg')`,
              backgroundAttachment: 'fixed'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/30 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/10 via-transparent to-emerald-900/10" />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(15, 23, 42, 0.3) 100%)'
          }} />
        </div>
        <TouristNavbar initialTransparent={true} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Mountain className="w-8 h-8 text-teal-400" />
          <span className="text-2xl font-bold text-white">Zoy Tours</span>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-white/60 text-sm mb-8">
            Effective Date: September 2026<br />
            Last Updated: September 2026
          </p>

          <div className="prose prose-invert prose-teal max-w-none">
            <p className="text-white/80 text-lg leading-relaxed">
              Welcome to Zoy Tours. These Terms of Service ("Terms") govern your access to and use of 
              <Link href="/" className="text-teal-400 hover:text-teal-300 transition-colors"> zoytours.com</Link> 
              (the "Site") and your booking or stay at any of our properties: Paradise View Stay (Valparai), 
              Hilltop Valparai, Aira Vista (Valparai), Oak Valley Resort (Kotagiri), and Cherai Beach Villa Stay 
              (collectively, the "Properties").
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              By accessing the Site, making an inquiry, or booking a stay, you agree to be bound by these Terms. 
              If you do not agree, please do not use our Site or services.
            </p>

            {/* Section 1 */}
            <section className="mt-10">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                1. About Zoy Tours
              </h2>
              <p className="text-white/80 leading-relaxed">
                Zoy Tours is the parent brand operating the Properties listed above. References to "we," "us," 
                or "our" refer to Zoy Tours and, where applicable, the specific Property you are booking or staying at.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                2. Eligibility
              </h2>
              <p className="text-white/80 leading-relaxed">
                You must be at least 18 years old to make a booking with us. By booking, you confirm that you 
                have the legal authority to enter into this agreement and, if booking on behalf of a group, 
                that you are authorized to bind all members of that group to these Terms.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                3. Bookings &amp; Reservations
              </h2>
              <ul className="list-disc list-inside text-white/80 space-y-3 leading-relaxed">
                <li>
                  Bookings may be made via our Site, WhatsApp, phone, or through a third-party travel platform.
                </li>
                <li>
                  A booking is confirmed only once you receive written confirmation (via WhatsApp, email, or SMS) 
                  and, where applicable, payment has been received.
                </li>
                <li>
                  You are responsible for ensuring that all information provided at the time of booking 
                  (dates, number of guests, contact details) is accurate. We are not liable for issues arising 
                  from inaccurate information you provide.
                </li>
                <li>
                  We reserve the right to decline or cancel a booking at our discretion, including in cases of 
                  suspected fraud, abuse, or unavailability, in which case any advance payment will be refunded.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                4. Pricing &amp; Payment
              </h2>
              <ul className="list-disc list-inside text-white/80 space-y-3 leading-relaxed">
                <li>
                  All prices are listed in Indian Rupees (INR) and are subject to change without notice until 
                  a booking is confirmed.
                </li>
                <li>
                  Payments are processed securely via Razorpay. We do not store your full card or payment credentials.
                </li>
                <li>
                  Advance payment: Up to 50% of the total booking value is required to confirm a booking.
                </li>
                <li>
                  Balance payment: The remaining balance is due at check-in.
                </li>
                <li>
                  Applicable taxes (e.g., GST) will be added to your total as required by law.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                5. Cancellation &amp; Refund Policy
              </h2>
              <p className="text-white/80 leading-relaxed mb-3">
                Cancellation terms vary by Property. As a general policy across all Properties:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-3 leading-relaxed">
                <li>
                  <span className="font-medium text-white">Cancellations made 14 days or more before check-in:</span>{' '}
                  Please contact us directly for the specific refund terms applicable to your Property, as these vary.
                </li>
                <li>
                  <span className="font-medium text-white">Cancellations made within 14 days of check-in:</span>{' '}
                  Non-refundable.
                </li>
                <li>
                  <span className="font-medium text-white">No-shows:</span> Treated as a same-day cancellation and 
                  are non-refundable.
                </li>
                <li>
                  <span className="font-medium text-white">Rescheduling:</span> Rescheduling is allowed, subject to 
                  availability at the new dates. Please contact us as early as possible to arrange a new date for 
                  your stay.
                </li>
                <li>
                  Refunds, where applicable, will be processed to the original payment method within 5 to 7 business days.
                </li>
                <li>
                  In the event a Property must cancel your booking (e.g., due to unforeseen maintenance, weather, 
                  or safety concerns), you will be offered a full refund or the option to reschedule.
                </li>
              </ul>
              <div className="mt-4 p-4 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                <p className="text-white/70 text-sm">
                  <span className="text-teal-400 font-medium">Note:</span> The 14-day/non-refundable threshold is 
                  a general baseline. Please confirm and document each Property's specific cancellation terms so 
                  guests can be told the exact policy that applies to their booking.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                6. Check-In / Check-Out
              </h2>
              <ul className="list-disc list-inside text-white/80 space-y-3 leading-relaxed">
                <li>
                  <span className="font-medium text-white">Check-in time:</span> 12:00 PM
                </li>
                <li>
                  <span className="font-medium text-white">Check-out time:</span> 11:00 AM
                </li>
                <li>
                  Early check-in or late check-out is subject to availability and may incur additional charges.
                </li>
                <li>
                  A valid, original government-issued photo ID (Aadhaar, Passport, Voter ID, or Driving Licence) 
                  is required for all guests at check-in, in accordance with applicable hospitality regulations. 
                  We may be required to record and report guest identity details to local authorities where 
                  mandated by law.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                7. Guest Conduct &amp; Property Rules
              </h2>
              <p className="text-white/80 leading-relaxed mb-3">
                By staying at any Property, you agree to:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-3 leading-relaxed">
                <li>Use the accommodation and its facilities responsibly and only for lawful purposes.</li>
                <li>
                  Not exceed the maximum occupancy specified for your booking without prior approval.
                </li>
                <li>
                  Be liable for any damage caused to Property furnishings, fixtures, or facilities during your 
                  stay, beyond normal wear and tear.
                </li>
                <li>
                  Comply with any specific house rules communicated to you at or before check-in (e.g., policies 
                  on smoking, pets, outside visitors, noise, or parties).
                </li>
                <li>
                  Vacate the Property by the specified check-out time unless a late check-out has been approved.
                </li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-4">
                We reserve the right to remove any guest from a Property without refund in cases of illegal activity, 
                property damage, or behavior that endangers other guests or staff.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                8. Liability &amp; Disclaimers
              </h2>
              <ul className="list-disc list-inside text-white/80 space-y-3 leading-relaxed">
                <li>
                  Zoy Tours and its Properties are not liable for loss, theft, or damage to personal belongings 
                  during your stay, except where caused by our proven negligence.
                </li>
                <li>
                  We are not liable for injury, illness, or accidents occurring on Property premises, except 
                  where caused by our proven negligence, and subject to applicable law.
                </li>
                <li>
                  Our Properties are located in hill-station and coastal regions; weather conditions, road access, 
                  power availability, and network connectivity may vary and are outside our control. We are not 
                  liable for disruptions caused by such factors (force majeure), including but not limited to 
                  landslides, heavy rainfall, or local authority restrictions.
                </li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-4">
                Photographs and descriptions on our Site are for illustrative purposes; minor variations in the 
                actual Property may occur.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                9. Intellectual Property
              </h2>
              <p className="text-white/80 leading-relaxed">
                All content on the Site — including the Zoy Tours name, logo, property names, text, images, and 
                design — is owned by or licensed to Zoy Tours and is protected under applicable intellectual 
                property laws. You may not copy, reproduce, or use this content for commercial purposes without 
                our prior written consent.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                10. Communications
              </h2>
              <p className="text-white/80 leading-relaxed">
                By providing your phone number or WhatsApp number, you consent to receive booking-related 
                communications, and — where you have opted in — promotional messages, via WhatsApp, SMS, phone, 
                or email. We use third-party providers, including Superfone and Heyo, to manage these 
                communications. You may opt out of promotional communications at any time.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                11. Third-Party Services &amp; Links
              </h2>
              <p className="text-white/80 leading-relaxed">
                Our Site and booking process may involve third-party services (e.g., Razorpay for payments, 
                Superfone and Heyo for communications, or third-party travel platforms). We are not responsible 
                for the practices or content of these third parties, which are governed by their own terms and 
                privacy policies.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                12. Changes to These Terms
              </h2>
              <p className="text-white/80 leading-relaxed">
                We may update these Terms from time to time to reflect changes in our services or legal 
                requirements. The "Last Updated" date at the top of this page indicates when the most recent 
                changes were made. Your continued use of our Site or services after any such changes constitutes 
                your acceptance of the updated Terms.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                13. Governing Law &amp; Dispute Resolution
              </h2>
              <p className="text-white/80 leading-relaxed">
                These Terms are governed by the laws of India. Any disputes arising out of or relating to these 
                Terms or your booking shall be subject to the exclusive jurisdiction of the courts at Valparai, 
                Tamil Nadu.
              </p>
              <p className="text-white/80 leading-relaxed mt-3">
                We encourage you to first raise any concerns directly with us so we can attempt to resolve them 
                amicably before pursuing formal action.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                14. Contact Us
              </h2>
              <p className="text-white/80 leading-relaxed mb-3">
                For questions about these Terms, or to raise a grievance, please contact:
              </p>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-white font-medium">Reji Francis</p>
                <p className="text-white/80 mt-1">
                  <span className="text-teal-400">Email:</span>{' '}
                  <a href="mailto:paradise@hilltopvalparai.in" className="text-teal-400 hover:text-teal-300 transition-colors">
                    paradise@hilltopvalparai.in
                  </a>
                </p>
                <p className="text-white/80">
                  <span className="text-teal-400">Phone / WhatsApp:</span>{' '}
                  <a href="tel:+919487875275" className="text-teal-400 hover:text-teal-300 transition-colors">
                    +91 94878 75275
                  </a>
                </p>
                <p className="text-white/80 mt-1">
                  <span className="text-teal-400">Address:</span>{' '}
                  <span className="text-white/70">
                    10/151, Vazhaithottam, Valparai, 642127, Tamil Nadu, India
                  </span>
                </p>
              </div>
            </section>

            {/* Footer Note */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm leading-relaxed">
                These Terms of Service apply to zoytours.com and its associated Properties (Paradise View Stay Valparai, 
                Hilltop Valparai, Aira Vista Valparai, Oak Valley Resort Kotagiri, and Cherai Beach Villa Stay). 
                They do not cover other Zoy Tours ventures operating under separate domains or brands.
              </p>
            </div>
          </div>
        </div>
        {/* Footer */}
<footer className="py-12 border-t border-white/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <div className="flex items-center gap-2 mb-2">
          <Mountain className="w-6 h-6 text-teal-400" />
          <span className="text-xl font-bold text-white">Zoy Tours</span>
        </div>
        <p className="text-white/70 text-sm">Luxury hill station experiences redefined</p>
      </div>
      
      <div className="flex items-center gap-6">
        <a href="/privacy-policy" className="text-white/70 hover:text-white transition-colors text-sm">Privacy Policy</a>
        <a href="/terms-of-service" className="text-white/70 hover:text-white transition-colors text-sm">Terms of Service</a>
        <a href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">Contact Us</a>
      </div>
      
      <div className="text-white/70 text-sm">
        Designed By{" "}
        <a 
          href="https://blackstoneinfomatics.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
        >
          Blackstone Infomatics
        </a>
      </div>
    </div>
  </div>
</footer>
      </div>

    </div>
    
  );
}