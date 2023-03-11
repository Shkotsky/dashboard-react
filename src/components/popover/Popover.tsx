import { useDispatch, useSelector } from 'react-redux';
import classes from './Popover.module.scss';
import { RootState, AppDispatch } from '../../store';
import { useLocation, useParams } from 'react-router-dom';
import { addProjectToFolder } from '../../store/folderSlice';
import { Folder } from '../../assets/interfaces/folderInterface';
import {
  removeProjectFromFolder,
  fetchSingleFolder,
} from '../../store/singleFolderSlice';

interface Props {
  projectId: string;
  onUpdatePopover: Function;
}

const MoveToFolder = ({ projectId, onUpdatePopover }: Props) => {
  const folder = useSelector((state: RootState) => state.folder);
  const singleFolder = useSelector((state: RootState) => state.singleFolder);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<string>();

  const location = useLocation();

  const handleMoveToFolder = (folder: Folder) => {
    dispatch(addProjectToFolder({ projectId, folder }));
    onUpdatePopover('');
  };

  const handleRemoveProject = async () => {
    const filteredProjects = singleFolder.projects
      .filter((project) => project.id !== projectId)
      .map((project) => project.id);
    await dispatch(removeProjectFromFolder({ filteredProjects, id }));
    await dispatch(fetchSingleFolder(id));
    onUpdatePopover('');
  };

  const filteredFolders = folder.folders.map((folder) => {
    return {
      ...folder,
      inFolder: folder.projects.includes(projectId),
    };
  });

  return (
    <div className={classes.popover}>
      {location.pathname === '/' && (
        <>
          <h4>Move to folder:</h4>
          {filteredFolders.map((item) => {
            if (!item.inFolder) {
              return (
                <div
                  onClick={() => handleMoveToFolder(item)}
                  className={classes.popover__folder}
                  key={item.id}
                >
                  <span>{item.name}</span>
                </div>
              );
            }
            return null;
          })}
        </>
      )}
      {location.pathname !== '/' && (
        <div
          className={classes.popover__folder}
          onClick={() => handleRemoveProject()}
        >
          <h4>Remove project</h4>
        </div>
      )}
    </div>
  );
};

export default MoveToFolder;
