import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAdpoRD92iPRfOnNVWRbP0MVXBTou5gH0Y",
    authDomain: "snapchat-clone-yt-7e4c9.firebaseapp.com",
    projectId: "snapchat-clone-yt-7e4c9",
    storageBucket: "snapchat-clone-yt-7e4c9.appspot.com",
    messagingSenderId: "356160772190",
    appId: "1:356160772190:web:bdcc16121a1e799a653ccf"
  };

  const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
 export const auth = getAuth();
 export const storage = getStorage();
 export const provider = new GoogleAuthProvider();
 provider.setCustomParameters({ prompt: 'select_account' });
