export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  isGame?: boolean;
}

export interface Stat {
  value: number;
  label: string;
}

