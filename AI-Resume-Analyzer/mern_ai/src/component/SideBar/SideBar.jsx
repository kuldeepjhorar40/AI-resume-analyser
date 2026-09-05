import React, { useContext } from "react";

import styles from "./SideBar.module.css";

import ArticleIcon from
  "@mui/icons-material/Article";

import DashboardIcon from
  "@mui/icons-material/Dashboard";

import LogoutIcon from
  "@mui/icons-material/Logout";

import ManageSearchIcon from
  "@mui/icons-material/ManageSearch";

import AdminPanelSettingsIcon from
  "@mui/icons-material/AdminPanelSettings";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "../utils/AuthContext";

const SideBar = () => {

  const navigate = useNavigate();

  const location =
    useLocation();

  const {
    isLogin,
    setLogin,
    userInfo,
    setUserInfo
  } =
    useContext(AuthContext);

  /*
    LOGOUT FLOW:
    Clear localStorage -> Clear Context -> Login
  */
  const handleLogout = ()=>{
    localStorage.clear();
    setLogin(false);
    setUserInfo(null);
    navigate("/");
  }

  return (
    <div className={styles.sideBar}>

      {/* SIDEBAR TOP ICON AND CONTENT */}
      <div
        className={
          styles.sideBarIcon
        }
      >

        <ArticleIcon
          color="primary"
          fontSize="medium"
          sx={{
            fontSize: 54,
            marginBottom: 2,
          }}
        />

        <div
          className={
            styles.sideBarTopContent
          }
        >
          Resume Screening
        </div>

      </div>


      {/* SIDEBAR OPTIONS */}
      <div
        className={
          styles.sideBarOptionsBlock
        }
      >

        <Link
          to="/Dashboard"
          className={[
            styles.sideBarOption,

            location.pathname ===
            "/Dashboard"
              ? styles.selectedOption
              : null,

          ].join(" ")}
        >

          <DashboardIcon
            sx={{
              fontSize: 22,
            }}
          />

          <div>
            DashBoard
          </div>

        </Link>


        <Link
          to="/History"
          className={[
            styles.sideBarOption,

            location.pathname ===
            "/History"
              ? styles.selectedOption
              : null,

          ].join(" ")}
        >

          <ManageSearchIcon
            sx={{
              fontSize: 22,
            }}
          />

          <div>
            History
          </div>

        </Link>


        {
          userInfo &&
          userInfo.role === 'admin' &&

          <Link
            to="/Admin"
            className={[
              styles.sideBarOption,

              location.pathname ===
              "/Admin"
                ? styles.selectedOption
                : null,

            ].join(" ")}
          >

            <AdminPanelSettingsIcon
              sx={{
                fontSize: 22,
              }}
            />

            <div>
              Admin
            </div>

          </Link>
        }


        <Link
          to="/"
          onClick={handleLogout}
          className={
            styles.sideBarOption
          }
        >

          <LogoutIcon
            sx={{
              fontSize: 22,
            }}
          />

          <div>
            Logout
          </div>

        </Link>

      </div>

    </div>
  );
};

export default SideBar;