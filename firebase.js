
  
// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqH_fsmNYRdMHviH5f9v6qpPHzwEEGEIY",
    authDomain: "taskboard-1ad15.firebaseapp.com",
    projectId: "taskboard-1ad15",
    storageBucket: "taskboard-1ad15.appspot.com",
    messagingSenderId: "696471618865",
    appId: "1:696471618865:web:4deae39ab2c781e81b5c10"
  };
  







const app =!getApps().length? initializeApp(firebaseConfig):getApp();
const db=getFirestore()
const storage=getStorage()
const auth = getAuth();
export {app,db,storage,auth}