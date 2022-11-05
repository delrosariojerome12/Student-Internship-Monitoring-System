import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChWRSAtePq-heBofnFgd4H_Fnq5uoSmig",
  authDomain: "sims-6bd68.firebaseapp.com",
  projectId: "sims-6bd68",
  storageBucket: "sims-6bd68.appspot.com",
  messagingSenderId: "620428188675",
  appId: "1:620428188675:web:00652fad77b18ac7168236",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
};
