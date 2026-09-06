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
  HOC FLOW:
  Protected Component -> Check isLogin ->
  Login page if false / Component if true
*/
const withAuthHOC = (
  WrappedComponent
) => {


  return function AuthenticatedComponent(
    props
  ) {


    const {
      isLogin,
      setLogin,
    } =
      useContext(
        AuthContext
      );


    const navigate =
      useNavigate();


    useEffect(() => {


      if (!isLogin) {

        setLogin(false);

        navigate("/");

      }


    }, [
      isLogin,
      setLogin,
      navigate,
    ]);


    if (!isLogin) {

      return null;

    }


    return (

      <WrappedComponent
        {...props}
      />

    );

  };

};


export default withAuthHOC;