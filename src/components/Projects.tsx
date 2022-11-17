import { useEffect, useState } from "react";
import Loader from "./Loader";
import { ProjectSliceState, Project } from "../interfaces/projectInterface";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragMoveEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  arraySwap,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableProject } from "./SortableProject";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { updateProjects } from "../store/projectSlice";
import { useLocation } from "react-router-dom";
import { updateFolderProjects } from "../store/singleFolderSlice";

interface ProjectProps {
  project: ProjectSliceState;
}

const Projects = ({ project }: ProjectProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = project.projects.findIndex((i) => i.id === active.id);
      const newIndex = project.projects.findIndex((i) => i.id === over.id);
      const movedArray = arrayMove(project.projects, oldIndex, newIndex);

      if (!location.pathname.includes("folder")) {
        dispatch(updateProjects(movedArray));
      } else {
        dispatch(updateFolderProjects(movedArray));
      }
    }
  }

  return (
    <>
      {project.loading && <Loader />}

      {!project.loading && project.error ? (
        <div>Error: {project.error}</div>
      ) : null}
      {!project.loading && project.projects.length ? (
        <div className="wrapper">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={project.projects}
              strategy={rectSortingStrategy}
            >
              {project.projects.map(
                (
                  {
                    name,
                    id,
                    price,
                    source_language,
                    progress,
                    target_languages,
                    created_at,
                  }: Project,
                  index
                ) => {
                  return (
                    <SortableProject
                      key={id}
                      project={{
                        name,
                        id,
                        price,
                        source_language,
                        progress,
                        target_languages,
                        created_at,
                      }}
                    />
                  );
                }
              )}
            </SortableContext>
          </DndContext>
        </div>
      ) : null}
    </>
  );
};

export default Projects;
