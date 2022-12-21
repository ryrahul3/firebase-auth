import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const addNameImage = (displayName, photoURL) => {
  updateProfile(auth.currentUser, {
    displayName,
    photoURL,
  })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

const handleProviderLogin = (provider, customParameter = null) => {
  if (customParameter != null && typeof customParameter === "object")
    provider.setCustomParameters(customParameter);

  signInWithPopup(auth, provider)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

export { auth, addNameImage, handleProviderLogin };
