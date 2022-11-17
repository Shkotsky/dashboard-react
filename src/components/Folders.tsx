import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchFolders,
  sortByProjectsSize,
  sortByDate,
  updateFolders,
} from "../store/folderSlice";
import Loader from "./Loader";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  arraySwap,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableFolder } from "./SortableFolder";

enum FolderSortType {
  Date = "Date",
  Project = "Project",
}

const Folders = () => {
  const folderState = useSelector((state: RootState) => state.folder);
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState<FolderSortType>(FolderSortType.Date);

  useEffect(() => {
    dispatch(fetchFolders());
  }, []);

  useEffect(() => {
    if (selected === "Date") {
      dispatch(sortByDate());
    } else if (selected === "Project") {
      dispatch(sortByProjectsSize());
    }
  }, [selected]);

  useEffect(() => {
    dispatch(sortByDate());
  }, [folderState.sorting]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 18,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = folderState.folders.findIndex((i) => i.id === active.id);
      const newIndex = folderState.folders.findIndex((i) => i.id === over.id);
      console.log(oldIndex, newIndex);
      dispatch(
        updateFolders(arrayMove(folderState.folders, oldIndex, newIndex))
      );
    }
  }

  return (
    <>
      {folderState.loading && <Loader />}
      <div className="sort-by">
        <span>Order by:</span>
        <select
          onChange={(e) =>
            setSelected(FolderSortType[e.target.value as FolderSortType])
          }
        >
          <option>{FolderSortType.Date}</option>
          <option>{FolderSortType.Project}</option>
        </select>
      </div>
      <div className="wrapper">
        {!folderState.loading && folderState.error ? (
          <div>Error: {folderState.error}</div>
        ) : null}
        {!folderState.loading && folderState.folders.length ? (
          <>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={folderState.folders}
                strategy={rectSortingStrategy}
              >
                {folderState.folders.map((folder) => (
                  <SortableFolder key={folder.id} folder={folder} />
                ))}
              </SortableContext>
            </DndContext>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Folders;
