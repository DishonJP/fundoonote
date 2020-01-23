import firebase from 'firebase'
import fire from '../config/firebaseConfig'
const db = firebase.firestore();
async function userRegistration(data) {
    try {
        console.log("hh", data);
        const datas = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        }
        const response = await fire.auth().createUserWithEmailAndPassword(data.email, data.password)
        db.collection("users").doc(response.user.uid).set(datas)
        return response
    } catch (err) {
        return err;
    }
}

async function userLogin(data) {
    try {
        console.log("data", data);
        const datas = {
            email: data.email,
            password: data.password
        }
        const response = await fire.auth().signInWithEmailAndPassword(datas.email,datas.password)
        console.log("response", response);
        return response
    } catch (err) {
        return err;
    }
}

export default {
    userRegistration,
    userLogin
}