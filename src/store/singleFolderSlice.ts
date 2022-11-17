import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Project, ProjectSliceState } from "../interfaces/projectInterface";
import { editProjectName } from "./projectSlice";

interface Props {
  filteredProjects: string[];
  id?: string;
}
const initialState: ProjectSliceState = {
  projects: [],
  loading: false,
  error: "",
};
export const fetchSingleFolder = createAsyncThunk(
  "singleFolder/fetchSingleFolder",
  async (id: string | undefined) => {
    const res = await axios.get(`http://localhost:3000/folders/${id}`);

    const projects = await axios
      .all(
        res.data.projects.map((project: Project[]) =>
          axios.get(`http://localhost:3000/projects/${project}`)
        )
      )
      .then(
        axios.spread((...data) => {
          let projectData = [...data].map((item: any) => {
            return item.data;
          });
          return projectData;
        })
      );
    return projects;
    // const projects = await axios.get(`http://localhost:3000/projects?id=1`);

    // const folderProjects = await axios.get(
    //   `http://localhost:3000/projects?folderId=${id}`
    // );
    // console.log(folderProjects);
    // return folderProjects.data;
  }
);

export const removeProjectFromFolder = createAsyncThunk(
  "folder/removeProjectFromFolder",
  async ({ filteredProjects, id }: Props) => {
    const res = await axios.patch(`http://localhost:3000/folders/${id}`, {
      projects: filteredProjects,
    });
    return res.data;
  }
);

const SingleFolder = createSlice({
  name: "singleFolder",
  initialState,
  reducers: {
    updateFolderProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleFolder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleFolder.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
      console.log(action.payload, "popo");
      state.error = "";
    });
    builder.addCase(fetchSingleFolder.rejected, (state, action) => {
      state.loading = false;
      state.projects = [];
      state.error = action.error.message;
    });
    builder.addCase(removeProjectFromFolder.fulfilled, (state, action) => {
      state.loading = false;
      console.log(state.projects, "STATE", action.payload, "PAYLOAD");
      state.projects = action.payload;
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
export const { updateFolderProjects } = SingleFolder.actions;
export default SingleFolder.reducer;
