// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw7S_NE5NgagVKqpZAiMlw3KUpf-6ryUU",
  authDomain: "asiantrade-connect.firebaseapp.com",
  projectId: "asiantrade-connect",
  storageBucket: "asiantrade-connect.firebasestorage.app",
  messagingSenderId: "5232508543",
  appId: "1:5232508543:web:579980eed65e1f29db494a",
  measurementId: "G-091JH4389N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
