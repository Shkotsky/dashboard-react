import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import moment from 'moment';
import classes from './Projects.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { editProjectName } from '../store/projectSlice';
import { removePropagation } from '../modules/removePropagation';
import Popover from './popover/Popover';
import { useLocation, useParams } from 'react-router-dom';
import { Project } from '../assets/interfaces/projectInterface';

export function SortableProject(props: Project) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [isEditing, setIsEditing] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  const folder = useParams<string>();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameValue(e.target.value);
  };
  const handleClose = () => {
    setIsEditing('');
  };
  const handleSubmitEditProjectName = (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.key === 'Enter') {
      dispatch(editProjectName({ id, renameValue }));
      handleClose();
    }
  };

  const handleEditProjectName = (id: string) => {
    isEditing !== id ? setIsEditing(id) : setIsEditing('');
  };

  const handlePopover = (id: string) => {
    currentProject !== id ? setCurrentProject(id) : setCurrentProject('');
  };
  const updatePopover = (value: string) => {
    setCurrentProject(value);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={classes.project}
      onClick={() => handleClose()}
    >
      {props.name && (
        <div className={classes.project__content}>
          <div className={classes.project__content__streach}>
            <div className="flex-end" style={{ position: 'relative' }}>
              <FontAwesomeIcon
                icon={faEllipsisV}
                onClick={(e) => handlePopover(props.id)}
              />
              <>
                {currentProject === props.id && location.pathname === '/' && (
                  <Popover
                    projectId={props.id}
                    onUpdatePopover={updatePopover}
                  />
                )}

                {currentProject === props.id &&
                  location.pathname === `/folder/${folder.id}` && (
                    <Popover
                      projectId={props.id}
                      onUpdatePopover={updatePopover}
                    />
                  )}
              </>
            </div>
            {isEditing === props.id ? (
              <input
                type="text"
                defaultValue={props.name}
                onChange={(e) => onChange(e)}
                onClick={(e) => removePropagation(e)}
                onKeyDown={(e) => handleSubmitEditProjectName(e, props.id)}
              />
            ) : (
              <h3 onDoubleClick={() => handleEditProjectName(props.id)}>
                {props.name}
              </h3>
            )}

            <hr />
            <div className={classes.project__content__properties}>
              <p className={classes.project__content__properties__title}>
                DATE OF ORDER:
              </p>
              <p>{moment(props.created_at, 'YYYYMMDD').fromNow()}</p>
            </div>
            <div className={classes.project__content__properties}>
              <p className={classes.project__content__properties__title}>
                PRICE:
              </p>
              <p>{props.price.total_euro}&euro;</p>
            </div>
            <div className={classes.project__content__properties__align}>
              <div>
                <p className={classes.project__content__properties__title}>
                  FROM:
                </p>
                <p>{props.source_language}</p>
              </div>
              <div>
                <p className={classes.project__content__properties__title}>
                  TO:
                </p>
                <div className={classes.target_languages__container}>
                  {props.target_languages.map((langTarget: string) => {
                    return <p key={langTarget}>{langTarget}</p>;
                  })}
                </div>
              </div>
            </div>

            {props.progress.percent < 1 && (
              <div className={classes.project__progressbar}>
                <div
                  className={classes.project__progress}
                  style={{
                    width: props.progress.percent * 100 + '%',
                  }}
                ></div>
              </div>
            )}
          </div>
          <div>
            {props.progress.percent === 1 && (
              <div>
                <p className={classes.project__ready}>Translation is ready</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
