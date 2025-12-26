
import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, UserCircle, LogOut } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  userEmail: string;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLoginClick, onLogout, userEmail, userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Leistungen', id: 'leistungen' },
    { name: 'Über uns', id: 'ueber-uns' },
    { name: 'Unser Konzept', id: 'unser-konzept' },
    { name: 'Kontakt', id: 'kontakt' },
  ];

  const displayName = userName || userEmail.split('@')[0] || 'Kunde';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Leaf className={`h-8 w-8 ${scrolled ? 'text-green-700' : 'text-white'}`} />
            <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              KIRSCHS <span className="font-light">GARTENBAU</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${scrolled ? 'text-slate-700' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${scrolled ? 'border-slate-200 text-slate-700' : 'border-white/30 text-white'}`}>
                  <UserCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{displayName}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className={`p-2 hover:text-red-500 transition-colors ${scrolled ? 'text-slate-500' : 'text-white'}`}
                  title="Abmelden"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className={`text-sm font-semibold transition-colors hover:text-green-600 ${scrolled ? 'text-slate-700' : 'text-white'}`}
              >
                Anmelden
              </button>
            )}

            <a 
              href="#kontakt" 
              onClick={(e) => scrollToSection(e, 'kontakt')}
              className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              Beratung anfragen
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            {!isLoggedIn && (
              <button onClick={onLoginClick} className={scrolled ? 'text-slate-700' : 'text-white'}>
                <UserCircle className="h-6 w-6" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? 'text-slate-900' : 'text-white'} hover:text-green-600 p-2`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-green-700 border-b border-slate-50"
                onClick={(e) => scrollToSection(e, link.id)}
              >
                {link.name}
              </a>
            ))}
            {isLoggedIn ? (
              <div className="px-3 py-4 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center gap-2 text-green-700 font-bold">
                  <UserCircle className="h-5 w-5" />
                  <span>{displayName}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-red-600 p-1"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { onLoginClick(); setIsOpen(false); }}
                className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 border-b border-slate-50"
              >
                Anmelden / Registrieren
              </button>
            )}
            <div className="pt-4">
              <a 
                href="#kontakt"
                className="block w-full text-center bg-green-700 text-white px-4 py-4 rounded-xl font-bold text-lg"
                onClick={(e) => scrollToSection(e, 'kontakt')}
              >
                Jetzt Beratung anfragen
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
