import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCLq0gJNE88SCOsKPt01kDYTjp54e4-zxo',
  authDomain: 'todos-9d46d.firebaseapp.com',
  databaseURL: 'https://todos-9d46d-default-rtdb.firebaseio.com',
  projectId: 'todos-9d46d',
  storageBucket: 'todos-9d46d.appspot.com',
  messagingSenderId: '428926781781',
  appId: '1:428926781781:web:51b5827f3a82576cca87dc',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)