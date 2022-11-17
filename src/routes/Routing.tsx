import React, { useState } from "react";
import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import Home from "../pages/Home";
import SingleFolder from "../pages/SingleFolder";
const Routing = () => {
  const [isActiveCreateFolderModal, setIsActiveCreateFolderModal] =
    useState<boolean>(false);

  const location = useLocation();
  return (
    <>
      {location.pathname === "/" && (
        <div>
          <div>
            <button
              className="btn"
              onClick={() =>
                setIsActiveCreateFolderModal(!isActiveCreateFolderModal)
              }
            >
              + New Folder
            </button>
          </div>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isActiveCreateFolderModal={isActiveCreateFolderModal}
              setIsActiveCreateFolderModal={setIsActiveCreateFolderModal}
            />
          }
        />
        <Route path="folder/:id" element={<SingleFolder />} />
      </Routes>
    </>
  );
};

export default Routing;
