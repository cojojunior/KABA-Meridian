export interface Product {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface NavLink {
  name: string;
  path: string;
}
