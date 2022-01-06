import { initializeApp } from "firebase/app";
import { initializeAnalytics } from "firebase/analytics";

const firebaseConfigJSON = import.meta.env.VITE_FIREBASE_CONFIG;
if (typeof firebaseConfigJSON !== "string") {
  throw new Error("FIREBASE_CONFIG is not set");
}

const firebaseConfig = JSON.parse(firebaseConfigJSON);

const app = initializeApp(firebaseConfig);
const analytics = initializeAnalytics(app);

export { app, analytics };
