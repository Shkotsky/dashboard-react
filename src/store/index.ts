import { configureStore } from "@reduxjs/toolkit";

import folderSlice from "./folderSlice";
import projectSlice from "./projectSlice";
import singleFolderSlice from "./singleFolderSlice";
import projectModalSlice from "./projectModalSlice";

export const store = configureStore({
  reducer: {
    folder: folderSlice,
    project: projectSlice,
    singleFolder: singleFolderSlice,
    projectModal: projectModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
