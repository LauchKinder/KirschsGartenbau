
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GardenAI from './components/GardenAI';
import { X, Mail, Lock, LogIn, User, Phone, UserPlus, ArrowLeft } from 'lucide-react';

type AuthView = 'login' | 'register';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration logic
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setAuthView('login'); // Reset for next time
  };

  const openModal = (view: AuthView) => {
    setAuthView(view);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLoginClick={() => openModal('login')} 
        onLogout={() => {
          setIsLoggedIn(false);
          setUserName('');
          setUserEmail('');
        }}
        userEmail={userEmail}
        userName={userName}
      />
      <main className="flex-grow">
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      
      <GardenAI />

      {/* Auth Modal (Login & Registration) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="p-8 md:p-10">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-100 rounded-2xl text-green-700">
                  {authView === 'login' ? <LogIn className="h-8 w-8" /> : <UserPlus className="h-8 w-8" />}
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-2 font-serif">
                {authView === 'login' ? 'Kunden-Login' : 'Konto erstellen'}
              </h2>
              <p className="text-slate-500 text-center mb-8">
                {authView === 'login' 
                  ? 'Melden Sie sich an, um Ihre Termine einzusehen.' 
                  : 'Werden Sie Teil unserer Garten-Community in der Region.'}
              </p>
              
              {authView === 'login' ? (
                /* Login Form */
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">E-Mail Adresse</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        type="email" 
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="ihre@mail.de"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Passwort</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Anmelden
                  </button>
                  
                  <p className="mt-8 text-center text-sm text-slate-500">
                    Noch kein Kundenkonto? <button onClick={() => setAuthView('register')} className="text-green-700 font-bold hover:underline">Jetzt registrieren</button>
                  </p>
                </form>
              ) : (
                /* Registration Form */
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Vollständiger Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        type="text" 
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Max Mustermann"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">E-Mail Adresse</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        type="email" 
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="ihre@mail.de"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Telefonnummer</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        type="tel" 
                        placeholder="0123 / 456789"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Passwort festlegen</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 mt-4"
                  >
                    Konto erstellen
                  </button>

                  <button 
                    type="button"
                    onClick={() => setAuthView('login')}
                    className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-green-700 font-medium py-2 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Zurück zum Login
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
