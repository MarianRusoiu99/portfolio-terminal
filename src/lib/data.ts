import type {
  AppData,
  Command,
  Experience,
  Project,
  Social,
  Contact,
  ContactForm,
  FooterData,
} from "@/types/portfolio";

import rawData from "./data.json";

const data = rawData as unknown as AppData;

export const getAbout = (): string => data.about;

export const getName = (): string => data.name;

export const getAvatar = (): string => data.avatar;

export const getHeadline = (): string => data.headline;

export const getSecondaryHeadlines = (): string[] => data.secondaryHeadline;

export const getSkills = (): string[] => data.skills;

export const getSocials = (): Social[] => data.socials;

export const getCommands = (): Command[] => data.commands;

export const getProjects = (): Project[] => data.projects;

export const getExperience = (): Experience[] => data.experience;

export const getContact = (): Contact => data.contact;

export const getContactForm = (): ContactForm => data.contactForm;

export const getFooter = (): FooterData => data.footer;

// Re-export raw data for backward compatibility
export const appData = data;