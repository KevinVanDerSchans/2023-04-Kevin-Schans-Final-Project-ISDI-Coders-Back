import * as dotenv from 'dotenv';
dotenv.config();

export const user = process.env.DB_USER;
export const password = process.env.DB_PASSWORD;
export const dbName = process.env.DB_NAME;
export const secret = process.env.JWT_SECRET;
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "alexmelanie-b9d39.firebaseapp.com",
  projectId: "alexmelanie-b9d39",
  storageBucket: "alexmelanie-b9d39.appspot.com",
  messagingSenderId: "404928580440",
  appId: "1:404928580440:web:55731ce41742326944332d"
};

