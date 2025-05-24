export interface Issue {
  id: string;
  project_id: string;
  title: string;
  description: string;
  github_issue_id: number;
  reward_amount: number;
  status: 'open' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}
