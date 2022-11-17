import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import moment from "moment";
import classes from "./SortableFolder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export function SortableFolder(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.folder.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={classes.folder}
    >
      <div className={classes.folder__icon}>
        <FontAwesomeIcon
          icon={faFolder}
          className={classes.folder__icon__size_color}
        />
        <Link to={`folder/${props.folder.id}`} className="remove_decoration">
          <FontAwesomeIcon
            className={classes.folder__icon__ellipsis}
            icon={faEllipsisV}
          />
        </Link>
      </div>
      <div className={classes.folder__content}>
        <h3>{props.folder.name}</h3>
        <div className={classes.folder__content__properties}>
          <FontAwesomeIcon icon={faFolderOpen} />
          <p>{props.folder.projects.length + " Projects"}</p>
        </div>
        <div className={classes.folder__content__properties}>
          <FontAwesomeIcon icon={faClock} />

          <p>
            {"Created on " +
              moment(props.folder.created_at).format("MMMM DD, YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
}
