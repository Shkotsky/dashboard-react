import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  Project,
  ProjectSliceState,
} from '../assets/interfaces/projectInterface';

const initialState: ProjectSliceState = {
  projects: [],
  loading: false,
  error: '',
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const res = await axios.get('http://localhost:3000/projects');
    return res.data;
  }
);

export const addProject = createAsyncThunk(
  'project/addProject',
  async (project: Partial<Project>) => {
    const res = await axios.post('http://localhost:3000/projects', {
      type: 'project',
      ...project,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return res.data;
  }
);

interface PatchProps {
  id: string;
  renameValue: string;
}

export const editProjectName = createAsyncThunk(
  'project/editProjectName',
  async (props: PatchProps) => {
    const res = await axios.patch(
      `http://localhost:3000/projects/${props.id}`,
      {
        name: props.renameValue,
      }
    );
    return res.data;
  }
);

const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    updateProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
      state.error = '';
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.projects = [];
      state.error = action.error.message;
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = [...state.projects, action.payload];
    });
    builder.addCase(addProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(editProjectName.fulfilled, (state, action) => {
      state.loading = false;
      const projectId = action.payload.id;
      const projectToUpdate = state.projects.findIndex(
        (p) => p.id === projectId
      );
      state.projects[projectToUpdate] = action.payload;
    });
  },
});
export const { updateProjects } = ProjectSlice.actions;
export default ProjectSlice.reducer;
