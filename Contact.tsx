
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { SERVICES } from '../constants';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: SERVICES[0]?.title || 'Allgemeine Beratung',
    message: '',
    _honeypot: '' // Spamschutz-Feld (bleibt leer für Menschen)
  });

  const FORMSPREE_ID = "xjgvbpay"; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Spamschutz-Check
    if (formData._honeypot) return;

    setStatus('submitting');
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _subject: `Gartenanfrage: ${formData.service} von ${formData.name}`,
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ 
          name: '', 
          email: '', 
          service: SERVICES[0]?.title || 'Allgemeine Beratung', 
          message: '',
          _honeypot: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Versandfehler:", error);
      setStatus('error');
    }
  };

  return (
    <section id="kontakt" className="py-24 bg-slate-900 text-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <h2 className="text-green-400 text-sm font-bold tracking-widest uppercase mb-3">Kontakt</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-serif text-white">Ihr Projekt in der Region.</h3>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Wir sind in <span className="text-white font-bold underline decoration-green-500/30 underline-offset-4">Kuppenheim, Baden-Baden</span> und Umgebung für Sie da. Wir freuen uns auf Ihre Nachricht.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <div className="p-3 bg-green-500/20 rounded-2xl text-green-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Rufen Sie uns an</p>
                  <p className="text-lg font-bold">+49 (0) 157 123 456 78</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <div className="p-3 bg-green-500/20 rounded-2xl text-green-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">E-Mail Kontakt</p>
                  <p className="text-lg font-bold">kirschsgartenbau01@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <div className="p-3 bg-green-500/20 rounded-2xl text-green-400 shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Einsatzgebiet</p>
                  <p className="text-lg font-bold">76456 Kuppenheim & Umkreis</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="relative">
              {status === 'success' ? (
                <div className="bg-white rounded-[3rem] p-12 text-slate-900 shadow-2xl text-center animate-in zoom-in duration-500 border-8 border-green-50">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-4xl font-bold mb-4 font-serif">Anfrage gesendet!</h3>
                  <p className="text-slate-600 text-lg max-w-md mx-auto mb-8 leading-relaxed">
                    Vielen Dank. Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden bei Ihnen zurück.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-8 py-4 rounded-2xl transition-all"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-8 md:p-12 text-slate-900 shadow-2xl relative overflow-hidden border-8 border-slate-800/5">
                  {status === 'submitting' && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                      <Loader2 className="h-12 w-12 text-green-700 animate-spin mb-4" />
                      <p className="font-bold text-slate-700 uppercase tracking-widest text-sm">Wird sicher übertragen...</p>
                    </div>
                  )}

                  {/* Honeypot Feld (versteckt für User) */}
                  <input 
                    type="text" 
                    name="_honeypot" 
                    style={{ display: 'none' }} 
                    tabIndex={-1} 
                    autoComplete="off"
                    onChange={handleChange}
                    value={formData._honeypot}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Ihr Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">E-Mail Adresse</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="mail@beispiel.de"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Gewünschte Leistung</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all appearance-none cursor-pointer shadow-inner"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Sonstiges / Beratung">Sonstiges / Beratung</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Ihre Nachricht</label>
                    <textarea 
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Beschreiben Sie kurz Ihr Projekt..."
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all resize-none shadow-inner"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-5 rounded-[1.5rem] shadow-xl transition-all flex items-center justify-center gap-3 group active:scale-[0.98] disabled:grayscale"
                  >
                    <span className="text-lg">Beratung jetzt anfragen</span>
                    <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>

                  {status === 'error' && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-2 text-sm font-medium animate-pulse">
                      <AlertCircle className="h-5 w-5" />
                      Ein Übertragungsfehler ist aufgetreten. Bitte schreiben Sie uns direkt per E-Mail.
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
