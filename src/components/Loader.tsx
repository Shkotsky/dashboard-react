import React from "react";
import classes from "./Loader.module.scss";

const Loader = () => {
  return (
    <>
      <h2>Loading...</h2>
      <div className={classes.loading}></div>
    </>
  );
};

export default Loader;
