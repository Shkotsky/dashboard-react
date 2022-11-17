import { createSlice } from "@reduxjs/toolkit";

interface projectModalState {
  isActive: boolean;
}

const initialState: projectModalState = {
  isActive: false,
};

const ProjectModalSlice = createSlice({
  name: "ToggleProjectModalState",
  initialState,
  reducers: {
    toggleModal(state) {
      state.isActive = !state.isActive;
    },
  },
});
export const { toggleModal } = ProjectModalSlice.actions;

export default ProjectModalSlice.reducer;
