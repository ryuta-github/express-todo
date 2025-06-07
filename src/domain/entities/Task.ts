export interface Task {
  id: number;
  title: string;
  status: string;
  created_at: Date;
  updated_at?: Date;
} 