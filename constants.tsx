
import React from 'react';
import { Service } from './types';
import { 
  Scissors, 
  Trash2, 
  Wind, 
  Droplets, 
  Sparkles,
  Shovel,
  Users,
  Coins
} from 'lucide-react';

export const SERVICES: Service[] = [
  {
    id: 'rasen',
    title: 'Rasen mähen',
    description: 'Fachgerechte Kürzung mit modernem Rasenmäher für ein perfektes Schnittbild.',
    icon: 'Wind',
    image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hecke',
    title: 'Heckenschnitt',
    description: 'Sorgfältiger Form- und Rückschnitt der Hecke durch unsere Mitarbeiter.',
    icon: 'Scissors',
    image: 'https://images.unsplash.com/photo-1558905619-171420d4f0c9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'entsorgung',
    title: 'Abfall-Entsorgung',
    description: 'Ein Mitarbeiter sammelt Gras und Abfälle händisch auf und entsorgt alles sauber.',
    icon: 'Trash2',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'reinigung',
    title: 'Terrassen-Reinigung',
    description: 'Ein Mitarbeiter reinigt Ihre Terrasse gründlich von Schmutz und Moos.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1516211697149-d867c48c909e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'unkraut',
    title: 'Unkraut entfernen',
    description: 'Ein Mitarbeiter pflückt händisch das Unkraut aus den Fugen Ihrer Terrasse.',
    icon: 'Shovel',
    image: 'https://images.unsplash.com/photo-1592150621344-82d43b7da71a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'giessen',
    title: 'Pflanzen gießen',
    description: 'Ein Mitarbeiter sorgt für die optimale Wasserversorgung Ihrer Gartenpflanzen.',
    icon: 'Droplets',
    image: 'https://images.unsplash.com/photo-1416870230247-3b443a66377c?auto=format&fit=crop&q=80&w=800'
  }
];

export const TEAM = [
  { name: 'Elia Kirsch', role: 'Gründer & Mitarbeiter' },
  { name: 'Philipp Ziegler', role: 'Gründer & Mitarbeiter' },
  { name: 'Jonas Heutle', role: 'Gründer & Mitarbeiter' },
  { name: 'Luca Heutle', role: 'Gründer & Mitarbeiter' }
];

export const ICON_MAP: Record<string, any> = {
  Scissors,
  Trash2,
  Wind,
  Droplets,
  Sparkles,
  Shovel,
  Users,
  Coins
};
