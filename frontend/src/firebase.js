import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import "firebase/compat/storage";
import "firebase/compat/database";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
});

const auth = app.auth();
const storage = app.storage();
const database = app.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { storage, database, auth, googleProvider, app as default };


// apiKey: process.env.REACT_APP_APIKEY,
// databaseURL: process.env.REACT_APP_DATABASEURL,
// authDomain: process.env.REACT_APP_AUTHDOMAIN,
// projectId: process.env.REACT_APP_PROJECTID,
// storageBucket: process.env.REACT_APP_STORAGEBUCKET,
// messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
// appId: process.env.REACT_APP_APPID,
// measurementId: process.env.REACT_APP_MEASUREMENTID,