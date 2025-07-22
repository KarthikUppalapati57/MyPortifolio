import React from 'react';

const Hero: React.FC = () => {
  const handleViewWorkClick = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-6">
        {/* Text Content - Left Side */}
        <div className="md:w-3/5 text-center md:text-left">
          <p className="text-lg text-red-500 mb-2 font-mono">Hi, my name is</p>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-50 mb-4">Siva Sai Pavan Karthik Uppalapati.</h1>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-400 mb-6">I build intelligent solutions.</h2>
          <p className="max-w-xl text-lg text-gray-300 mb-8 mx-auto md:mx-0">
            I'm an AI enthusiast and problem-solver driven by a passion for building smart, scalable, and user-centric solutions. With hands-on experience in machine learning, data-driven applications, and responsive web design, I turn complex ideas into real-world impact. I don’t just code — I create.
          </p>
          <button
            onClick={handleViewWorkClick}
            className="inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30"
          >
            View My Work
          </button>
        </div>

        {/* Image - Right Side */}
        <div className="w-full max-w-xs md:w-2/5 md:max-w-sm mt-12 md:mt-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-gray-900 rounded-full blur-lg opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative rounded-full overflow-hidden shadow-2xl border-4 border-gray-800/80">
                <img
                  src="https://raw.githubusercontent.com/KarthikUppalapati57/MyPortifolio/main/ChatGPT%20Image%20Jun%2026%2C%202025%2C%2006_52_32%20PM.png"
                  alt="A professional headshot of Siva Sai Pavan Karthik Uppalapati"
                  className="w-full h-auto"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;