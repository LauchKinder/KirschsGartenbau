
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  location: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
