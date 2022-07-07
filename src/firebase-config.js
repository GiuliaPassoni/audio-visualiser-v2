import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyAk2y1qMmM6a73Vwn9jt9j2u2JC4xMLOMo",
    authDomain: "gp22-audio-visualiser.surge.sh",
    projectId: "audio-visualiser-5cb73",
    storageBucket: "audio-visualiser-5cb73.appspot.com",
    messagingSenderId: "360615209654",
    appId: "1:360615209654:web:206d57f36c14de60e05417",
    measurementId: "G-YCPND3M8Z9"
};

const app = initializeApp(firebaseConfig);
//to get who is authenticated and access it in different files:
export const auth = getAuth(app);

// const analytics = getAnalytics(app);