import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Folder, FolderSliceState } from '../assets/interfaces/folderInterface';

const initialState: FolderSliceState = {
  folders: [],
  loading: false,
  error: '',
  sorting: false,
};

export const fetchFolders = createAsyncThunk(
  'folders/fetchFolders',
  async () => {
    const response = await axios.get('http://localhost:3000/folders');
    return response.data;
  }
);

export const addFolder = createAsyncThunk(
  'folder/addFolder',
  async (folderName: string) => {
    const res = await axios.post('http://localhost:3000/folders', {
      type: 'project-folder',
      name: folderName,
      created_at: new Date(),
      updated_at: new Date(),
      projects: [],
    });
    return res.data;
  }
);
interface Props {
  projectId: string;
  folder: Folder;
}

export const addProjectToFolder = createAsyncThunk(
  'folder/addProjectToFolder',
  async ({ projectId, folder }: Props) => {
    const res = await axios.patch(
      `http://localhost:3000/folders/${folder.id}`,
      {
        updated_at: new Date(),
        projects: [projectId, ...folder.projects],
      }
    );
    // const res = await axios.patch(
    //   `http://localhost:3000/projects/${projectId}`,
    //   {
    //     folderId: folder.id,
    //   }
    // );
    return res.data;
  }
);

const FolderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    sortByProjectsSize: (state) => {
      const newArray = [...state.folders].sort(
        (a, b) => b.projects.length - a.projects.length
      );
      state.folders = newArray;
    },
    sortByDate: (state) => {
      const newArray = [
        ...state.folders.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
      ];
      state.folders = newArray;
    },
    updateFolders: (state, action) => {
      state.folders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFolders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFolders.fulfilled, (state, action) => {
      state.loading = false;
      state.folders = action.payload;
      state.error = '';
      state.sorting = !state.sorting;
    });
    builder.addCase(fetchFolders.rejected, (state, action) => {
      state.loading = false;
      state.folders = [];
      state.error = action.error.message;
    });
    builder.addCase(addFolder.fulfilled, (state, actions) => {
      state.loading = false;
      state.folders = [...state.folders, actions.payload];
      state.error = '';
    });
    builder.addCase(addProjectToFolder.fulfilled, (state, action) => {
      state.loading = false;
      const folderId = action.payload.id;
      const folderToUpdate = state.folders.findIndex((p) => p.id === folderId);
      state.folders[folderToUpdate] = action.payload;
    });
  },
});
export const { sortByProjectsSize, sortByDate, updateFolders } =
  FolderSlice.actions;
export default FolderSlice.reducer;
