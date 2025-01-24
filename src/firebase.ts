// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCY1zH_lBM4XS4p1e_uyBYug_bAWqibc38",
  authDomain: "diri-63c68.firebaseapp.com",
  databaseURL: "https://diri-63c68-default-rtdb.firebaseio.com",
  projectId: "diri-63c68",
  storageBucket: "diri-63c68.firebaseapp.com",
  messagingSenderId: "806575571289",
  appId: "1:806575571289:web:e63642d1d1771925100c48",
  measurementId: "G-CF8ZGYHZCQ",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


// Exportar instancias necesarias
export { app, database};
