export type TJobItem = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
};

export type TJobItemExtended = TJobItem & {
  qualifications: string[];
  reviews: string[];
  description: string;
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};