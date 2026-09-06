import React, {
  useState,
  useContext,
} from "react";


import styles from "./Dashboard.module.css";


import CreditScoreIcon from
  "@mui/icons-material/CreditScore";


import Skeleton from
  "@mui/material/Skeleton";


import withAuthHOC from
  "../utils/HOC/withAuthHoc";


import {
  AuthContext,
} from "../utils/AuthContext";


import axios from
  "../utils/axios";


const Dashboard = () => {


  const [
    loading,
    setLoading
  ] =
    useState(false);


  const [
    uploadFileText,
    setUploadFileText
  ] =
    useState(
      "Upload Your File"
    );


  const [
    resumeFile,
    setResumeFile
  ] =
    useState(null);


  const [
    jobDesc,
    setJobDesc
  ] =
    useState("");


  const [
    result,
    setResult
  ] =
    useState("");


  const {
    userInfo
  } =
    useContext(
      AuthContext
    );


  /*
    FILE FLOW:
    Select PDF -> Show filename ->
    Store actual File object
  */
  const handleOnChangeFile =
    (event)=>{


      setUploadFileText(

        event.target.files[0].name

      );


      setResumeFile(

        event.target.files[0]

      );


    };


  /*
    ANALYZE FLOW:
    Resume + Job Description + User ID ->
    FormData -> Backend Resume API
  */
  const handleUpload =
    async()=>{


      setResult(null);


      if(!jobDesc){


        alert(
          "Please fill Job Description "
        );


        return;


      }


      if(!resumeFile){


        alert(
          "Please Upload Resume"
        );


        return;


      }


      const formData =
        new FormData();


      formData.append(

        "resume",

        resumeFile

      );


      formData.append(

        "job_desc",

        jobDesc

      );


      formData.append(

        "user",

        userInfo._id

      );


      try{


        setLoading(true);


        const response =
          await axios.post(

            "/api/resume/addResume",

            formData

          );


        console.log(response);


        setResult(

          response.data.data

        );


      }


      catch(err){


        console.log(err);


      }


      finally{


        setLoading(false);


      }


    }


  return (

    <div
      className={
        styles.Dashboard
      }
    >


      {/* LEFT SIDE */}

      <div
        className={
          styles.DashboardLeft
        }
      >


        <div
          className={
            styles.DashboardHeaderTitle
          }
        >

          Smart Resume Screening

        </div>


        <div
          className={
            styles.DashboardHeaderLargeTitle
          }
        >

          Resume Matching Score

        </div>


        <div
          className={
            styles.alertInfo
          }
        >


          <div
            className={
              styles.instructionTitle
            }
          >

            🔔 Important Instructions:

          </div>


          <div
            className={
              styles.dashboardInstruction
            }
          >


            <div>

              🗒️ Please paste your complete
              job description in
              "Job Description" before submitting.

            </div>


            <div>

              🔗 Only PDF format resumes
              are accepted.

            </div>


          </div>


        </div>


        <div
          className={
            styles.DashboardUploadResume
          }
        >


          {/* ROW 1 */}

          <div
            className={
              styles.uploadRow
            }
          >


            <div
              className={
                styles.DashboardResumeBlock
              }
            >


              <div>

                {uploadFileText}

              </div>


              {(

                <div
                  className={
                    styles.fileName
                  }
                >

                </div>

              )}


            </div>


            <div
              className={
                styles.DashboardInputField
              }
            >


              <label

                htmlFor="inputField"

                className={
                  styles.uploadBtn
                }

              >

                Upload Resume

              </label>


              <input

                className={
                  styles.fileInput
                }

                type="file"

                accept=".pdf"

                id="inputField"

                onChange={
                  handleOnChangeFile
                }

              />


            </div>


          </div>


          {/* ROW 2 */}

          <div
            className={
              styles.jobDesc
            }
          >


            <textarea

              className={
                styles.textArea
              }

              placeholder=
                "Paste Your Job Description here..."

              rows={10}

              value={
                jobDesc
              }

              onChange={
                (e) =>

                  setJobDesc(
                    e.target.value
                  )
              }

            />


            <button

              className={
                styles.AnalyzeBtn
              }

              onClick={
                handleUpload
              }

            >

              Analyze

            </button>


          </div>


        </div>


      </div>



      {/* RIGHT SIDE */}

      <div
        className={
          styles.DashboardRight
        }
      >


        <div
          className={
            styles.DashboardRightTopCard
          }
        >


          <div>

            Analyze with AI

          </div>


          <img

            src={
              userInfo?.photoUrl
            }

            alt="User profile"

            className={
              styles.profileImg
            }

          />


          <div>

            {userInfo?.name}

          </div>


        </div>


        {
          loading &&

          <Skeleton

            className={
              styles.DashboardRightTopCard
            }

            variant="rectangular"

            height={"280px"}

            animation="wave"

          />
        }


        {
          result &&

          <div
            className={
              styles.DashboardRightTopCard
            }
          >


            <div>

              Result

            </div>


            <h1>

              {result.score}%

              {" "}

              <CreditScoreIcon

                sx={{
                  fontSize: 22,
                }}

              />

            </h1>


            <div
              className={
                styles.feedback
              }
            >


              <h3>

                Feedback

              </h3>


              <p>

                {result.feedback}

              </p>


            </div>


          </div>
        }


      </div>


    </div>

  );

};


export default withAuthHOC(
  Dashboard
);