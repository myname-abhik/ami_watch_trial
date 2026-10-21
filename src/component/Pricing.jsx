import React, { useState } from 'react';

// Main Pricing component (renamed from App)
const Pricing = () => { // Renamed App to Pricing
  return (
    <>
     <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-50 blur-lg"
            >
                <source src="https://videos.pexels.com/video-files/3129540/3129540-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
    <div className="min-h-screen    flex flex-col items-center justify-center py-10 font-sans">
       
    
      <h1 className="text-4xl font-bold text-white mb-12">Pricing</h1>
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <PricingCard
          plan="3-Month Plan"
          features={[
            "Access to the full library with basic functionality",
            "Download up to 10 titles per month",
            "Single Device Access",
            "Ad-Lite Streaming",
          ]}
          buttonText="Buy Now"
          gradientFrom="from-blue-400"
          gradientTo="to-teal-400"
        />
        <PricingCard
          plan="6-Month Plan"
          features={[
            "Download up to 20 titles per month.",
            "Stream on two screens simultaneously.",
            "Early access to selected new releases.",
            "Enjoy a 5-10% discount compared to monthly renewals.",
          ]}
          buttonText="Buy Now"
          gradientFrom="from-yellow-400"
          gradientTo="to-orange-400"
        />
        <PricingCard
          plan="12-Month Plan"
          features={[
            "Access to all exclusive content",
            "Unlimited Offline Downloads",
            "Stream on up to 4 screens simultaneously.",
            "Ad-Free Streaming.",
          ]}
          buttonText="Buy Now"
          gradientFrom="from-amber-600"
          gradientTo="to-orange-700"
        />
      </div>
      
    </div>
    </>
  );
};

// PricingCard component (remains the same)
const PricingCard = ({ plan, features, buttonText, gradientFrom, gradientTo }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (


    
    <div

    
      className={`
        relative
        w-80 h-[450px] // Fixed width and height for consistency
        bg-gradient-to-br ${gradientFrom} ${gradientTo}
        rounded-2xl
        shadow-xl
        flex flex-col justify-between // Added justify-between to push button to bottom
        p-8
         cursor-pointer
        transition-all duration-300 ease-in-out
        transform
        ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    
      <h2 className="text-3xl font-semibold text-white mb-6">{plan}</h2>
      {/* Changed mb-8 to mb-6 for slightly more space above the button */}
      <ul className="text-white text-lg space-y-3 mb-6 max-h-52 pr-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`
          w-full
           mt-[20px]
          py-3
          bg-white
          text-gray-800
          font-bold
          rounded-xl
          shadow-lg
          transition-all duration-300 ease-in-out
          hover:bg-gray-200 hover:scale-105
          focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
        `}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Pricing; // Exported Pricing instead of App
