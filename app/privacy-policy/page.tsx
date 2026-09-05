import React from 'react'
import TouristNavbar from '../components/Navbar'
import { Metadata } from 'next';
import { Link, Mountain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Zoy Tours',
  description: 'Learn how Zoy Tours collects, uses, and protects your personal information when you book stays at our properties in Valparai, Kotagiri, and Cherai.',
  keywords: 'Zoy Tours privacy, data protection, guest information, booking privacy, Valparai, Kotagiri, Cherai',
  openGraph: {
    title: 'Privacy Policy | Zoy Tours',
    description: 'Privacy policy for Zoy Tours outlining how we handle your personal data, booking information, and guest details.',
    url: 'https://zoytours.com/privacy-policy',
    siteName: 'Zoy Tours',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zoytours.com/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};
const privacypolicy = () => {
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
          <div className="prose prose-invert prose-teal max-w-6xl mt-20">
            <p className="text-white/80 text-lg leading-relaxed">
              At Zoy Tours, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you visit our website{' '}
              <Link href="/" className="text-teal-400 hover:text-teal-300 transition-colors">zoytours.com</Link>, 
              make a booking, or stay at any of our Properties: Paradise View Stay (Valparai), Hilltop Valparai, 
              Aira Vista (Valparai), Oak Valley Resort (Kotagiri), and Cherai Beach Villa Stay.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              By using our Site and services, you agree to the collection and use of information in accordance 
              with this policy.
            </p>

            {/* Section 1 */}
            <section className="mt-10">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-white/80 leading-relaxed mb-3">We may collect the following types of information:</p>
              
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Personal Information</h3>
              <ul className="list-disc list-inside text-white/80 space-y-2 leading-relaxed">
                <li>Name, email address, phone number, and WhatsApp number</li>
                <li>Government-issued photo ID (Aadhaar, Passport, Voter ID, or Driving Licence) for check-in compliance</li>
                <li>Payment information (processed securely via Razorpay — we do not store full payment credentials)</li>
                <li>Booking details including dates, number of guests, and special requests</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Non-Personal Information</h3>
              <ul className="list-disc list-inside text-white/80 space-y-2 leading-relaxed">
                <li>IP address, browser type, device information, and operating system</li>
                <li>Pages visited, time spent on the Site, and referral sources</li>
                <li>Cookies and similar tracking technologies (see Section 6)</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-white/80 leading-relaxed mb-3">We use your information to:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2 leading-relaxed">
                <li>Process and confirm your bookings</li>
                <li>Communicate with you regarding your booking (via WhatsApp, SMS, email, or phone)</li>
                <li>Comply with legal and regulatory requirements (including guest registration)</li>
                <li>Send promotional messages and offers (only where you have opted in)</li>
                <li>Improve our services, website, and guest experience</li>
                <li>Manage and respond to your inquiries and grievances</li>
                <li>Prevent fraud and ensure the security of our Site and Properties</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                3. Sharing Your Information
              </h2>
              <p className="text-white/80 leading-relaxed mb-3">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 leading-relaxed">
                <li>
                  <span className="font-medium text-white">Third-Party Service Providers:</span> Razorpay (payment 
                  processing), Superfone and Heyo (communications), and other partners who assist in operating our 
                  business. These parties are bound by their own privacy policies.
                </li>
                <li>
                  <span className="font-medium text-white">Legal Authorities:</span> When required by law, regulation, 
                  or legal process, or to protect the rights, property, or safety of Zoy Tours, our guests, or others.
                </li>
                <li>
                  <span className="font-medium text-white">Property Staff:</span> Relevant staff at the specific 
                  Property you are booking to facilitate your stay.
                </li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-3">
                We do not sell, rent, or trade your personal information to third parties for marketing purposes 
                without your explicit consent.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                4. Data Security
              </h2>
              <p className="text-white/80 leading-relaxed">
                We implement reasonable security measures to protect your personal information from unauthorized 
                access, alteration, disclosure, or destruction. These include:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 leading-relaxed mt-3">
                <li>Secure SSL encryption for data transmission on our Site</li>
                <li>Payment processing through Razorpay (PCI-DSS compliant)</li>
                <li>Access controls to limit internal access to personal data</li>
                <li>Regular security assessments and monitoring</li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-3">
                While we strive to protect your information, no method of transmission over the internet or 
                electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                5. Data Retention
              </h2>
              <p className="text-white/80 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined 
                in this Privacy Policy, including:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 leading-relaxed mt-3">
                <li>
                  <span className="font-medium text-white">Booking Records:</span> Retained for a reasonable period 
                  to comply with legal, accounting, and reporting requirements.
                </li>
                <li>
                  <span className="font-medium text-white">Guest Information:</span> Retained as required by 
                  hospitality regulations in India.
                </li>
                <li>
                  <span className="font-medium text-white">Marketing Data:</span> Retained until you opt out or 
                  request deletion.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-white/80 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our Site. Cookies 
                are small data files stored on your device that help us:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 leading-relaxed mt-3">
                <li>Understand how you use our Site</li>
                <li>Remember your preferences and settings</li>
                <li>Improve site performance and functionality</li>
                <li>Analyze traffic and user behavior</li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-3">
                You can control cookie preferences through your browser settings. However, disabling cookies may 
                affect your experience on our Site.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                7. Your Rights and Choices
              </h2>
              <p className="text-white/80 leading-relaxed">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2 leading-relaxed mt-3">
                <li>
                  <span className="font-medium text-white">Access:</span> Request a copy of the personal data we hold about you.
                </li>
                <li>
                  <span className="font-medium text-white">Correction:</span> Request correction of inaccurate or incomplete data.
                </li>
                <li>
                  <span className="font-medium text-white">Deletion:</span> Request deletion of your personal data, 
                  subject to legal and regulatory obligations.
                </li>
                <li>
                  <span className="font-medium text-white">Opt-out:</span> Opt out of promotional communications 
                  at any time by following the unsubscribe instructions in our messages or contacting us directly.
                </li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-3">
                To exercise any of these rights, please contact us using the details in Section 11.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                8. Third-Party Links and Services
              </h2>
              <p className="text-white/80 leading-relaxed">
                Our Site may contain links to third-party websites or services, including:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 leading-relaxed mt-3">
                <li>Razorpay (payment processing)</li>
                <li>Superfone and Heyo (communications)</li>
                <li>Third-party travel platforms (e.g., booking aggregators)</li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-3">
                We are not responsible for the privacy practices or content of these third parties. We encourage 
                you to review their privacy policies before providing any personal information.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-white/80 leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect 
                personal information from children. If you are a parent or guardian and believe your child has 
                provided us with personal information, please contact us immediately.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-white/80 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal 
                requirements. The "Last Updated" date at the top of this page indicates when the most recent 
                changes were made. We encourage you to review this policy periodically.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3 mb-4">
                11. Contact Us
              </h2>
              <p className="text-white/80 leading-relaxed mb-3">
                If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
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
    )
}

export default privacypolicy
