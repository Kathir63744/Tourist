// app/signin/page.tsx
import SignInClient from './SignInClient';

export const metadata = {
  title: 'Sign In - HillEscape Member Login',
  description: 'Sign in to your HillEscape account to manage resort bookings, view reservations, and access exclusive deals for hill station resorts.',
  robots: {
    index: false,  // ⚠️ Prevents search engines from indexing this page
    follow: false,
  },
  openGraph: {
    title: 'Sign In - HillEscape Member Login',
    description: 'Sign in to manage your resort bookings and access exclusive deals.',
    url: '/signin',
    images: [{ 
      url: '/og-signin.jpg', 
      width: 1200, 
      height: 630, 
      alt: 'HillEscape Sign In' 
    }],
  },
  // No canonical needed since it's a login page
};

export default function Page() {
  return <SignInClient />;
}