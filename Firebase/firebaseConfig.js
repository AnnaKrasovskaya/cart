import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase, ref, onValue, set, push, get} from 'firebase/database'
const firebaseConfig ={
  "apiKey": "AIzaSyCxZy9eq2SyZmc-xXVl4KDHC7kEF7hrsIU",
  "authDomain": "burgerproject-5ae03.firebaseapp.com",
  "projectId": "burgerproject-5ae03",
  "storageBucket": "burgerproject-5ae03.firebasestorage.app",
  "messagingSenderId": "179889632532",
  "appId": "1:179889632532:web:db4ab3e39bc2729fa83e01",
  "measurementId": "G-S2N6Q8L25S",
  "databaseURL": "https://burgerproject-5ae03-default-rtdb.firebaseio.com"
}
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app)
export {auth, database, ref, onValue, set, push, get}
export default firebaseConfig