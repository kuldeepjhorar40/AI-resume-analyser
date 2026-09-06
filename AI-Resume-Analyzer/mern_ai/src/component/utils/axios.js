import axios from "axios";


/*
  AXIOS FLOW:
  Frontend Axios -> Express Backend
*/
const instance =
  axios.create({

    baseURL:
      import.meta.env.VITE_API_URL ||
      "http://localhost:4000",

    timeout: 120000,

  });


export default instance;