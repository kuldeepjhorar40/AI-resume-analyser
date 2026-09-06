import React, {
  useContext,
  useEffect,
  useState
} from "react";

import styles from "./History.module.css";

import Skeleton from
  "@mui/material/Skeleton";

import withAuthHOC from
  "../utils/HOC/withAuthHoc.jsx";

import axios from
  "../utils/axios.js";

import {
  AuthContext
} from "../utils/AuthContext.jsx";


const History = () => {

  const [result,setResult] =
    useState(null);

  const [loading,setLoading] =
    useState(false);

  const {
    isLogin,
    setLogin,
    userInfo,
    setUserInfo
  } =
    useContext(AuthContext);


  const userId =
    userInfo._id;


  /*
    HISTORY FLOW:
    User ID -> Resume History API ->
    Store Result -> Display History
  */
  const handleResumeInfo =
    async()=>{

      try{

        setResult(null);

        setLoading(true);


        const result =
          await axios.get(
            `/api/resume/${userId}`
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

      }

      finally{

        setLoading(false);

      }

    }


  useEffect(()=>{

    handleResumeInfo();

  },[]);


  return (

    <div
      className={
        styles.History
      }
    >

      <div
        className={
          styles.HistoryCardBlock
        }
      >


        {
          loading &&

          <>

            <Skeleton
              className={
                styles.HistoryCard
              }
              variant="rectangular"
              height={"280px"}
              animation="wave"
            />

            <Skeleton
              className={
                styles.HistoryCard
              }
              variant="rectangular"
              height={"280px"}
              animation="wave"
            />

            <Skeleton
              className={
                styles.HistoryCard
              }
              variant="rectangular"
              height={"280px"}
              animation="wave"
            />

          </>

        }


        {
          result &&

          result.map(
            (resumeItem,index)=>{

              return (

                <div
                  className={
                    styles.HistoryCard
                  }
                  key={
                    resumeItem._id ||
                    index
                  }
                >

                  <div
                    className={
                      styles.cardPercentage
                    }
                  >
                    {resumeItem.score}%
                  </div>


                  <h2>
                    {resumeItem.job_desc}
                  </h2>


                  <p>
                    Resume Name :
                    {" "}
                    {resumeItem.resume_name}
                  </p>


                  <p>
                    {resumeItem.feedback}
                  </p>


                  <p>
                    Dated :
                    {" "}
                    {
                      new Date(
                        resumeItem.updatedAt
                      )
                      .toLocaleDateString()
                    }
                  </p>

                </div>

              );

            }
          )
        }

      </div>

    </div>

  );

};


export default withAuthHOC(
  History
);