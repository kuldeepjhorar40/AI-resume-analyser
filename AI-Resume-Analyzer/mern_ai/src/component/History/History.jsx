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
  AuthContext,
} from "../utils/AuthContext.jsx";


const History = () => {


  const [
    result,
    setResult
  ] =
    useState(null);


  const [
    loading,
    setLoading
  ] =
    useState(false);


  const {
    isLogin,
    setLogin,
    userInfo,
    setUserInfo
  } =
    useContext(
      AuthContext
    );


  const userId =
    userInfo._id;


  /*
    HISTORY FLOW:
    Get logged-in user ID -> History API ->
    Store resumes -> Render cards
  */
const handleUpload = async()=>{

  setResult(null);

  if(!jobDesc){
    alert("Please fill Job Description ");
    return;
  }

  if(!resumeFile){
    alert("Please Upload Resume");
    return;
  }

  const formData = new FormData();

  formData.append("resume", resumeFile);
  formData.append("job_desc", jobDesc);
  formData.append("user", userInfo._id);

  try{

    setLoading(true);

    const response =
      await axios.post(
        "/api/resume/addResume",
        formData
      );

    console.log(response);

    setResult(response.data);

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


        {/* Loading skeleton cards */}

        {

          loading &&


          <>


            <Skeleton

              key={11212}

              className={
                styles.HistoryCard
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
                styles.HistoryCard
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

              key={11214322}

              className={
                styles.HistoryCard
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
                styles.HistoryCard
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


        {/* HISTORY CARD */}

        {

          result &&

          result.map(

            (
              resumeItem,
              index
            )=>{


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

                    Resume Name : {resumeItem.resume_name}

                  </p>


                  <p>

                    {resumeItem.feedback}

                  </p>


                  <p>

                    Dated : {

                      new Date(
                        resumeItem.updatedAt
                      )
                      .toLocaleDateString()

                    }

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


export default withAuthHOC(
  History
);