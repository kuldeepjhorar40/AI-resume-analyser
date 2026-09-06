import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";


/*
  FIREBASE FLOW:
  .env -> firebaseConfig -> Firebase Auth -> Google Provider
*/

const apiKey =
  import.meta.env.VITE_FIREBASE_API_KEY;


const projectId =
  import.meta.env.VITE_FIREBASE_PROJECT_ID;


const firebaseConfig = {

  apiKey: apiKey,

  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  projectId: projectId,

  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

  appId:
    import.meta.env.VITE_FIREBASE_APP_ID,

};


const app =
  initializeApp(firebaseConfig);


const auth =
  getAuth(app);


const provider =
  new GoogleAuthProvider();


/*
  GOOGLE LOGIN:
  Let user choose Google account
*/
provider.setCustomParameters({

  prompt: "select_account",

});


export {
  auth,
  provider,
};