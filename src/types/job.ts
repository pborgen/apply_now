export type JobSource = "linkedin" | "workday";

export type Job = {
  id: string;
  source: JobSource;
  title: string;
  company: string;
  location?: string;
  url: string;
  applied?: boolean;
  notes?: string;
};
