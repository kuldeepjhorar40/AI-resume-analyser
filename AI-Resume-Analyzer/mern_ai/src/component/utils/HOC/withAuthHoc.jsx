import React, {
  useContext,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../AuthContext";


/*
  AUTH HOC FLOW

  Protected Component
        ↓
  withAuthHOC
        ↓
  Check isLogin
      ↙     ↘
   false    true
     ↓        ↓
  Login     Component
*/


const withAuthHOC = (
  WrappedComponent
) => {


  /*
    Return a new component containing
    authentication checking logic.
  */
  return function AuthenticatedComponent(
    props
  ) {


    // Get current login state.
    const {
      isLogin,
      setLogin,
    } = useContext(AuthContext);


    // Used to redirect user.
    const navigate =
      useNavigate();


    /*
      Whenever login state changes,
      check whether user is authenticated.
    */
    useEffect(() => {

      if (!isLogin) {

        setLogin(false);

        // Send unauthenticated user to Login.
        navigate("/");

      }

    }, [
      isLogin,
      setLogin,
      navigate,
    ]);


    /*
      Do not render protected component
      while user is logged out.
    */
    if (!isLogin) {

      return null;

    }


    // User is authenticated.
    return (

      <WrappedComponent
        {...props}
      />

    );

  };
};


export default withAuthHOC;