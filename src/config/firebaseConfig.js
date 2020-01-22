import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDkFRmk8cZHbk41D3rOgKl1-iWMH6tF-Tg",
    authDomain: "fundoonote-f6fab.firebaseapp.com",
    databaseURL: "https://fundoonote-f6fab.firebaseio.com",
    projectId: "fundoonote-f6fab",
    storageBucket: "fundoonote-f6fab.appspot.com",
    messagingSenderId: "129863945226",
    appId: "1:129863945226:web:8992431f10355bffeea3f3",
    measurementId: "G-ZDM486XHGD"
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;