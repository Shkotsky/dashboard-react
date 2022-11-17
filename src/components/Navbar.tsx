import classes from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { toggleModal } from "../store/projectModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import CreateProjectModal from "./modals/CreateProjectModal";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projectModal = useSelector((state: RootState) => state.projectModal);

  return (
    <>
      <nav>
        <Link to={"/"}>
          <h1>MY WORKSPACE</h1>
        </Link>

        <button onClick={() => dispatch(toggleModal())} className={classes.btn}>
          + Create new project
        </button>
      </nav>
      {projectModal.isActive && <CreateProjectModal />}
    </>
  );
};

export default Navbar;
