export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  fields: string[];
  hasIncentive: boolean;
  incentiveAmount?: number;
  upvotes: number;
  downvotes: number;
  githubUrl: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface ProjectFilter {
  selectedTechnologies: string[];
  selectedFields: string[];
  showIncentivesOnly: boolean;
}
