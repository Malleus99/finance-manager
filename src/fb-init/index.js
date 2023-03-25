import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAIetGTNojl7AAXSfpNREPJ0zIDzlo61r0',
  authDomain: 'finance-manager-c0047.firebaseapp.com',
  databaseURL: 'https://finance-manager-c0047-default-rtdb.firebaseio.com',
  projectId: 'finance-manager-c0047',
  storageBucket: 'finance-manager-c0047.appspot.com',
  messagingSenderId: '770365870060',
  appId: '1:770365870060:web:c965e3edf2590897f4bac9',
  measurementId: 'G-0WGHXW1QQS',
});

export default firebaseApp;

export const db = getFirestore(firebaseApp);

export const auth = getAuth();
