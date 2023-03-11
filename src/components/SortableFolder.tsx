import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import moment from 'moment';
import classes from './SortableFolder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Folder } from '../assets/interfaces/folderInterface';

export function SortableFolder(props: Folder) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

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
        <Link to={`folder/${props.id}`} className="remove_decoration">
          <FontAwesomeIcon
            className={classes.folder__icon__ellipsis}
            icon={faEllipsisV}
          />
        </Link>
      </div>
      <div className={classes.folder__content}>
        <h3>{props.name}</h3>
        <div className={classes.folder__content__properties}>
          <FontAwesomeIcon icon={faFolderOpen} />
          <p>{props.projects.length + ' Projects'}</p>
        </div>
        <div className={classes.folder__content__properties}>
          <FontAwesomeIcon icon={faClock} />

          <p>
            {'Created on ' + moment(props.created_at).format('MMMM DD, YYYY')}
          </p>
        </div>
      </div>
    </div>
  );
}
