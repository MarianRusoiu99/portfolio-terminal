import type { ComponentType } from "react";

export interface Command {
  value: string;
  label: string;
  path: string;
}

export interface Social {
  label: string;
  href: string;
}

export interface Accomplishment {
  title: string;
  description: string;
  tags: string[];
}

export interface Experience {
  slug: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  accomplishments: Accomplishment[];
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  image: string;
  component?: string;
  githubUrl?: string;
  liveUrl?: string;
  period: string;
}

export interface ContactFormField {
  label: string;
  placeholder: string;
}

export interface ContactForm {
  name: ContactFormField;
  email: ContactFormField;
  subject: ContactFormField;
  message: ContactFormField;
  button: string;
}

export interface Contact {
  title: string;
  description: string;
  email: string;
  location: string;
  schedule: string;
  command: string;
}

export interface FooterData {
  title: string;
  cta: string;
  email: string;
}

export interface AppData {
  name: string;
  headline: string;
  secondaryHeadline: string[];
  avatar: string;
  socials: Social[];
  about: string;
  commands: Command[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  contact: Contact;
  contactForm: ContactForm;
  karaKeepBookmarks: unknown[];
  footer: FooterData;
}

export type TabComponent = ComponentType;