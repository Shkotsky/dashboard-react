import Folders from '../components/Folders';
import CreateFolderModal from '../components/modals/CreateFolderModal';
import CreateProjectModal from '../components/modals/CreateProjectModal';
import Projects from '../components/Projects';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchProjects } from '../store/projectSlice';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  LinearScale,
} from 'chart.js';
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  LinearScale
);

interface Props {
  isActiveCreateFolderModal: boolean;
  setIsActiveCreateFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = ({
  isActiveCreateFolderModal,
  setIsActiveCreateFolderModal,
}: Props) => {
  const projectModal = useSelector((state: RootState) => state.projectModal);
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector((state: RootState) => state.project);
  const folders = useSelector((state: RootState) => state.folder.folders);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const folderData = {
    labels: folders.map((folder) => folder.name),
    datasets: [
      {
        label: 'Folder size',
        data: folders.map((folder) => folder.projects.length),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(86, 255, 134)',
          'rgb(251, 107, 107)',
          'rgb(0, 211, 254)',
          'rgb(104, 83, 0)',
          'rgb(113, 113, 113)',
          'rgb(255, 75, 228)',
        ],
        hoverOffset: 16,
      },
    ],
  };
  const projectData = {
    labels: project.projects.map((project) => project.name),
    datasets: [
      {
        label: 'Progress Bar',
        data: project.projects.map((project) => project.progress.percent),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <>
      {isActiveCreateFolderModal && (
        <CreateFolderModal
          isActive={isActiveCreateFolderModal}
          setIsActive={setIsActiveCreateFolderModal}
        />
      )}
      {projectModal.isActive && <CreateProjectModal />}
      <Folders />
      <div className="chartContainer">
        <Doughnut data={folderData} />
        <Bar data={projectData} />
      </div>
      {project.projects && <Projects project={project} />}
    </>
  );
};

export default Home;
