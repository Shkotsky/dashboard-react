import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../store";
import { fetchSingleFolder } from "../store/singleFolderSlice";
import Projects from "../components/Projects";

type Params = {
  id: string;
};

const SingleFolder = () => {
  const { id } = useParams<Params>();
  const singleFolder = useSelector((state: RootState) => state.singleFolder);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSingleFolder(id));
  }, [id, dispatch]);

  return <Projects project={singleFolder} />;
};

export default SingleFolder;
