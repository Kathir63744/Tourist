export default function Herobanner() {
  return (
    <section 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center"
      aria-label="Hero section introducing Tour Mode travel platform"
    >
      
      {/* Background Video - Optimized */}
      <div className="absolute inset-0 h-full w-full">
        <video
          className="h-full w-full object-cover"
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          poster="/bg-video-poster.jpg" // Add a fallback poster image
        >
          <source src="/bg11.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <img 
            src="/bg.jpg" 
            alt="Scenic travel background" 
            className="h-full w-full object-cover"
          />
        </video>
        
        {/* Gradient overlay for better text readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
        <h1
          className="
            chrono
            text-[clamp(2rem,8vw,8rem)]
            font-black
            uppercase
            tracking-[0.12em] md:tracking-[0.15em]
            bg-[url('/d1.png')]
            bg-cover
            bg-center
            bg-fixed
            text-transparent
            bg-clip-text
            text-center
            leading-none
            drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]
            animate-fadeInleft
          "
        >
          TOUR EXPLORER
        </h1>
        
        <p className="
          migra 
          mt-6 md:mt-8 
          text-white/90 
          text-[clamp(1.25rem,2.5vw,2.1rem)]
          tracking-wide 
          text-center
          max-w-3xl
          mx-auto
          px-4
          drop-shadow-lg
          animate-fadeInUp
          animation-delay-200
        ">
          Discover destinations • Experience cultures • Travel smarter
        </p>
      </div>
    </section>
  );
}