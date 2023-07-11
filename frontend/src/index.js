import React from "react";
import ReactDOM from "react-dom/client";
//import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AnimatePresence } from "framer-motion";

import Login from "./pages/Login";
//import Home from "./pages/Home";
import Main from "./pages/Main";
import CurrentFCPS from "./pages/CurrentFCPS";
import AddFCPS from "./pages/AddFCPS";
import Supervisor from "./pages/Supervisor";
import Depart from "./pages/Depart";
import Loading from "./component/loading";
import PreviousFCPS from "./pages/PreviousFCPS";
import EditFCPS from "./pages/EditFCPS";
// ---------------- REPORTS --------------------
//import CurrentPG from "./reports/CurrentPG";
import AllPgReport from "./reports/allPgReport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/currentfcps",
    element: <CurrentFCPS />,
  },
  {
    path: "/addfcps",
    element: <AddFCPS />,
  },
  {
    path: "/supervisor",
    element: <Supervisor />,
  },
  {
    path: "/depart",
    element: <Depart />,
  },
  {
    path: "/loading",
    element: <Loading />,
  },
  {
    path: "/previousfcps",
    element: <PreviousFCPS />,
  },
  { path: "/editfcps/:id", element: <EditFCPS /> },
  { path: "/allpgreport", element: <AllPgReport /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
