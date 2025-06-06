import type Education from './models/education.ts';
import type ExperienceItem from './models/experience.ts';
import type ContactItem from './models/contact.ts';
import type { SkillItem } from './models/skill.ts';

export interface ApplicantData {
  name: string;
  jobTitle: string;
  about: string;
  contacts: ContactItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  education: Education;
  contribution: string[];
}
