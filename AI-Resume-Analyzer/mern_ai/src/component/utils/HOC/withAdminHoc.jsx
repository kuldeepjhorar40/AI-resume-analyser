import React, {
  useContext,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../AuthContext";


/*
  Admin Higher Order Component.

  It performs two checks:

  1. Is user logged in?
  2. Does user have role = "admin"?
*/

const withAdminHOC = (
  WrappedComponent
) => {

  return function AdminProtectedComponent(
    props
  ) {

    const {
      isLogin,
      userInfo,
    } = useContext(AuthContext);


    /*
      Not logged in.

      Send user to Login page.
    */
    if (!isLogin) {

      return (
        <Navigate
          to="/"
          replace
        />
      );

    }


    /*
      User is logged in but
      does not have Admin role.

      Send them back to Dashboard.
    */
    if (
      userInfo?.role !== "admin"
    ) {

      return (
        <Navigate
          to="/Dashboard"
          replace
        />
      );

    }


    /*
      User is authenticated
      and is an Admin.
    */
    return (
      <WrappedComponent
        {...props}
      />
    );

  };
};


export default withAdminHOC;