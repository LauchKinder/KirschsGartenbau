
import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block py-1 px-3 mb-4 text-xs font-bold tracking-widest text-green-300 uppercase bg-green-900/40 backdrop-blur-sm rounded border border-green-500/30">
          Junges Team • Gegründet 2026 • Region Baden-Baden
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Ihr Garten in <span className="text-green-400">besten</span> Händen.
        </h1>
        <p className="text-xl md:text-2xl text-slate-100 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          Wir pflegen Ihre grüne Oase mit höchster Sorgfalt in Kuppenheim & Umgebung. 
          <span className="block mt-2 text-green-300 underline decoration-green-500/50 underline-offset-4">Gartenarbeit auf fairer Spendenbasis.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => scrollTo('leistungen')}
            className="group w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white px-10 py-5 rounded-full text-lg font-bold transition-all shadow-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            Unsere Leistungen
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => scrollTo('kontakt')}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-full text-lg font-bold transition-all flex items-center justify-center hover:scale-105 active:scale-95"
          >
            Termin vereinbaren
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollTo('leistungen')}>
        <ChevronDown className="h-10 w-10 text-white/60" />
      </div>
    </section>
  );
};

export default Hero;
