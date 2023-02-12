import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../.env')});
// // console.log((process.env))
const serviceAccount = require(process.env.PRIVATE_SERVICE_KEY)

const app = firebase.initializeApp({serviceAccount});

const auth = app.auth();
const storage = app.storage();
const database = app.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { storage, database, auth, googleProvider, app as default };
