import axios from "axios";

/*
  AXIOS FLOW:
  Frontend Axios -> localhost:4000 -> Express Backend
*/
const instance =
  axios.create({

    baseURL:
      "http://localhost:4000",

    timeout: 120000,

  });

export default instance;