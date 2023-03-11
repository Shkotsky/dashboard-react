export interface Project {
  type: string;
  id: string;
  name: string;
  price: {
    total_euro: number;
  };
  source_language: string;
  target_languages: string[];
  progress: {
    percent: number;
  };
  created_at: string;
  updated_at: string;
}

export interface ProjectSliceState {
  projects: Project[];
  loading: boolean;
  error?: string;
}
