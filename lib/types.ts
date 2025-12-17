export interface Cause {
  id: string
  title: string
  description: string
  image: string
  goal: number
  raised: number
  category: string
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio:string;
  category: string;
  status: "pending" | "approved" | "rejected";
  profile_photo_url?: string;
  location?: string;
  skills?: string[];
  learning?: string[];
  experience?: string;
  availability?: string;
  background?: string;
  motivation?: string;
  createdAt?: string;
  occupation?:string;
  approvedAt?: string;
  assignedBoys?: number;
  hoursContributed?: number;
  emergencyContact?: string;
  emergencyPhone?: string;
  certifications?: string[];
  languages?: string[];
  preferredAge?: string;
}

export interface Testimonial {
  id: string
  name: string
  title: string
  quote: string
  image?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
}

export interface Event {
  id: string
  title: string
  description: string
  image: string
  date: string
  location: string
  category: string
}
