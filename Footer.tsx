
import React from 'react';
import { Leaf, Instagram, Facebook, Linkedin, MapPin, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Leaf className="h-8 w-8 text-green-700" />
              <span className="text-xl font-bold tracking-tight text-slate-900 font-serif">
                KIRSCHS <span className="font-light">GARTENBAU</span>
              </span>
            </div>
            <p className="text-slate-500 mb-6 leading-relaxed text-sm">
              Junges Team für professionelle Gartenpflege in Kuppenheim, Baden-Baden und Umgebung. Gegründet 2026.
            </p>
            <div className="flex items-center gap-2 text-green-700 font-bold mb-8">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">76456 Kuppenheim & Region</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-slate-50 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-slate-50 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Menü</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-slate-500 hover:text-green-700 transition-colors">Startseite</a></li>
              <li><a href="#leistungen" className="text-slate-500 hover:text-green-700 transition-colors">Leistungen</a></li>
              <li><a href="#ueber-uns" className="text-slate-500 hover:text-green-700 transition-colors">Über uns</a></li>
              <li><a href="#kontakt" className="text-slate-500 hover:text-green-700 transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Servicegebiet</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li>Kuppenheim</li>
              <li>Baden-Baden</li>
              <li>Rastatt</li>
              <li>Gaggenau / Murgtal</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Sicherheit</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-slate-500 hover:text-green-700 transition-colors">Impressum</a></li>
              <li><a href="#" className="text-slate-500 hover:text-green-700 transition-colors">Datenschutz</a></li>
              <li className="flex items-center gap-2 text-green-700 font-medium">
                <ShieldCheck className="h-4 w-4" />
                <span>SSL Verschlüsselt</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Kirschs Gartenbau. Handgefertigt für die Region.
          </p>
          <div className="flex items-center gap-6 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <span>Kuppenheim</span>
            <span>•</span>
            <span>Baden-Baden</span>
            <span>•</span>
            <span>Spendenbasiert</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
