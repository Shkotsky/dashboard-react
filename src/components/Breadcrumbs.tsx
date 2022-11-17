import React from "react";
import { useParams } from "react-router-dom";
import classes from "./Breadcrumbs.module.scss";

export const Breadcrumbs = () => {
  return (
    <>
      <div className={classes.breadcrumb}>
        <ul>
          <li>
            <h3>{}</h3>
            <h3>Test</h3>
          </li>
        </ul>
      </div>
    </>
  );
};
