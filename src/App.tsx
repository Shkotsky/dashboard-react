import "./assets/_main.scss";
import Routing from "./routes/Routing";
import Navbar from "./components/Navbar";
import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import Home from "./pages/Home";
import SingleFolder from "./pages/SingleFolder";
import { useEffect, useState } from "react";

function App() {
  return (
    <div>
      <div>
        <Navbar />

        <Routing />
      </div>
    </div>
  );
}

export default App;
