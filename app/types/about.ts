export interface AboutHero {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  launchDate: string;
  launchLabel: string;
}

export interface AboutStory {
  title: string;
  paragraphs: string[];
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutTeamMember {
  name: string;
  role: string;
  initials: string;
  photo?: string;
  bio?: string;
}

export interface AboutValue {
  title: string;
  description: string;
}

export interface AboutCta {
  title: string;
  subtitle: string;
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
}

export interface AboutConfig {
  hero: AboutHero;
  story: AboutStory;
  stats: AboutStat[];
  team: AboutTeamMember[];
  values: AboutValue[];
  cta: AboutCta;
}
