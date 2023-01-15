import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYqoEEL2nw3WzmHp9R6-ukmIigntSt2BY",
  authDomain: "sims-9f681.firebaseapp.com",
  projectId: "sims-9f681",
  storageBucket: "sims-9f681.appspot.com",
  messagingSenderId: "684908948986",
  appId: "1:684908948986:web:603ae938887bb473594843",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);
