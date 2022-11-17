export interface Folder {
  projects: string[];
  created_at: string;
  id: string;
  name: string;
  type: string;
  updated_at: string;
}

export interface FolderSliceState {
  folders: Folder[];
  loading: boolean;
  error?: string;
  sorting: boolean;
}
