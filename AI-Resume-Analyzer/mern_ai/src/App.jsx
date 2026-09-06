import SideBar from "./component/SideBar/SideBar";

import "./App.css";

import {
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./component/Dashboard/Dashboard";
import Admin from "./component/Admin/Admin";
import History from "./component/History/History";
import Login from "./component/Login/Login";


/*
  APP FLOW:
  App -> Sidebar + Routes
*/
function App() {

  return (

    <>

      <div className="App">

        <SideBar />

        <Routes>

          <Route
            path="/Dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/History"
            element={<History />}
          />

          <Route
            path="/Admin"
            element={<Admin />}
          />

        </Routes>

      </div>

    </>

  );

}


export default App;