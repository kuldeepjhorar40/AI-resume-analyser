import React, {
  useContext,
} from "react";


import styles from "./Login.module.css";


import VpnKeyIcon from
  "@mui/icons-material/VpnKey";


import GoogleIcon from
  "@mui/icons-material/Google";


import {
  auth,
  provider,
} from "../utils/firebase";


import {
  signInWithPopup,
} from "firebase/auth";


import {
  AuthContext,
} from "../utils/AuthContext";


import {
  useNavigate,
} from "react-router-dom";


import axios from
  "../utils/axios";


const Login = () => {


  const navigate =
    useNavigate();


  const {
    setLogin,
    setUserInfo,
  } =
    useContext(
      AuthContext
    );


  /*
    LOGIN FLOW:
    Google Firebase -> Backend User ->
    AuthContext -> localStorage -> Dashboard
  */
  const handleLogin =
    async () => {


      try {


        const result =
          await signInWithPopup(
            auth,
            provider
          );


        const user =
          result.user;


        const userData = {


          name:
            user.displayName,


          email:
            user.email,


          photoUrl:
            user.photoURL,


        };


        console.log(
          "Firebase User:",
          userData
        );


        const response =
          await axios.post(

            "/api/user",

            userData

          );


        console.log(
          "Backend Response:",
          response.data
        );


        const backendUser =
          response.data.user;


        setLogin(true);


        setUserInfo(
          backendUser
        );


        localStorage.setItem(

          "isLogin",

          "true"

        );


        localStorage.setItem(

          "userInfo",

          JSON.stringify(
            backendUser
          )

        );


        navigate(
          "/Dashboard"
        );


      }

      catch(err) {


        console.log(err);


        alert(
          "Something went Wrong"
        );


      }

    };


  return (

    <div
      className={
        styles.Login
      }
    >


      <div
        className={
          styles.loginCard
        }
      >


        <div
          className={
            styles.loginCardTitle
          }
        >


          <h1>
            Login
          </h1>


          <VpnKeyIcon />


        </div>


        <div

          className={
            styles.googleBtn
          }

          onClick={
            handleLogin
          }

        >


          <GoogleIcon

            sx={{
              color: "red",
              fontSize: 20,
            }}

          />


          Sign in with Google


        </div>


      </div>


    </div>

  );

};


export default Login;