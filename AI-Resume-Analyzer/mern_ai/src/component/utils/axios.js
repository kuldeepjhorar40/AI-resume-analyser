import axios from "axios";

/*
  Local:
  Vite frontend -> http://localhost:4000

  Production:
  Firebase frontend -> Render backend
*/
const instance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:4000",

  timeout: 120000,
});

export default instance;