import styles from "./Admin.module.css";

import React, {
  useContext,
  useEffect,
  useState
} from "react";

import Skeleton from
  "@mui/material/Skeleton";

import withAuthHOC from
  "../utils/HOC/withAuthHoc.jsx";

import axios from "../utils/axios.js";

import { AuthContext } from "../utils/AuthContext.jsx";


const Admin = () => {

  const [result,setResult] =
    useState(null);

  const [loading,setLoading] =
    useState(false);


  /*
    ADMIN FLOW:
    Admin API -> All resume records ->
    Store result -> Render Admin cards
  */
  const handleResumeInfo = async()=>{

      try{

          setResult(null);

          setLoading(true);

          const result =
            await axios.get(
              `/api/resume/get`
            );

          setResult(
            result.data.resumes
          );

          console.log(
            result.data.resumes
          );

      }

      catch(err){

        console.log(err);

        // alert("Something went wrong in history api call");

      }

      finally{

        setLoading(false);

      }

  }


  useEffect(()=>{

    handleResumeInfo();

  },[]);


  return (
    <div className={styles.Admin}>

      <div
        className={
          styles.AdminCardBlock
        }
      >


        {
          loading &&

          <>

            <Skeleton
              key={11212}
              className={
                styles.AdminCard
              }
              variant="rectangular"
              sx={{
                margin:
                  "10px auto 20px 0px",
              }}
              height={"280px"}
              animation="wave"
            />


            <Skeleton
              key={112123}
              className={
                styles.AdminCard
              }
              variant="rectangular"
              sx={{
                margin:
                  "10px auto 20px 0px",
              }}
              height={"280px"}
              animation="wave"
            />


            <Skeleton
              key={11212433}
              className={
                styles.AdminCard
              }
              variant="rectangular"
              sx={{
                margin:
                  "10px auto 20px 0px",
              }}
              height={"280px"}
              animation="wave"
            />

          </>

        }


        {/* ADMIN CARD */}
        {
          result &&
          result.map(
            (resumeItem,index)=>{

              return (

                <div
                  className={
                    styles.AdminCard
                  }
                  key={
                    resumeItem._id ||
                    index
                  }
                >

                  <h2>
                    {resumeItem.user?.name}
                  </h2>

                  <p
                    className={
                      styles.email
                    }
                  >
                    {resumeItem.user?.email}
                  </p>

                  <h3>
                    {resumeItem.score}%
                  </h3>

                  <p
                    className={
                      styles.description
                    }
                  >
                    {resumeItem.feedback}
                  </p>

                </div>

              )

            }
          )
        }

      </div>

    </div>
  );
};


// Protect Admin page using your existing authentication HOC.
export default withAuthHOC(
  Admin
);