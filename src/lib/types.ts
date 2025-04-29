export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  status: string;
}

export interface User {
  name: string;
  avatar?: string;
  bio: string;
  github: string;
  skills: string[];
  joinedDate: string;
  projects?: number;
  datasets?: number;
  status?: string;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: string;
  description?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  user?: string;
  project?: string;
}

export interface Settings {
  notifications: {
    email: boolean;
    browser: boolean;
    assignments: boolean;
    payments: boolean;
  };
  display: {
    theme: "system" | "light" | "dark";
    language: string;
  };
  privacy: {
    publicProfile: boolean;
    showActivity: boolean;
  };
}
