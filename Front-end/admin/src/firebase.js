import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBgm6J3fC7VW0sk3TJ3XHbepjTjqnKuXco",
  authDomain: "mockproject-fb3c8.firebaseapp.com",
  projectId: "mockproject-fb3c8",
  storageBucket: "mockproject-fb3c8.appspot.com",
  messagingSenderId: "92169501951",
  appId: "1:92169501951:web:f1fedfc3383e5d578a60ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);