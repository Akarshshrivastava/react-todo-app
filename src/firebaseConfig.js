import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD_TgRGkq_OzSPkh9udFydS9AD10oVzQQo",
  authDomain: "my-todo-app-cb148.firebaseapp.com",
  projectId: "my-todo-app-cb148",
  storageBucket: "my-todo-app-cb148.appspot.com",
  messagingSenderId: "590782386258",
  appId: "1:590782386258:web:19bf1136ddc6e1fc1bcf8b",
  measurementId: "G-MY903SKWCL",
};
const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
// export default db;

// export const db = app.firestore();
// export default app;
