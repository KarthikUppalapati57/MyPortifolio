import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans leading-relaxed antialiased selection:bg-red-500 selection:text-white">
      {/* Vertical Background Text */}
      <div
        className="fixed left-2 md:left-8 top-0 h-full flex items-center z-0 pointer-events-none"
        aria-hidden
      >
        <div
          style={{ writingMode: 'vertical-rl' }}
          className="text-[10vw] lg:text-[8vw] font-black text-white/5 select-none transform rotate-180 whitespace-nowrap"
        >
          LIGHT UP THE STYLE
        </div>
      </div>

      <div className="relative z-10">
        <Header />
        <main className="container mx-auto max-w-6xl px-6">
          <Hero />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
      <AIAssistant />
    </div>
  );
};

export default App;