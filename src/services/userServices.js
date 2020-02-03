import firebase from 'firebase'
import fire from '../config/firebaseConfig'
import jwt from 'jsonwebtoken'
import jwt_decode  from 'jwt-decode'
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
        // let token = jwt.sign(datas, servicesConstant, firebaseAuthorization.currentUser.uid, {
        //     expireIn:1440
        // })
        // localStorage.setItem('')
        const response = await fire.auth().signInWithEmailAndPassword(datas.email,datas.password)
        console.log("response", response);
        return response
    } catch (err) {
        return err;
    }
}
async function userLogout(){
    try {
        const response = await fire.auth().currentUser.signOut();
    return response;
    } catch (error) {
        return error;
    }
}
async function emailVerify(data) {
    try {
        const datas = {
            email: data.email
        }
        const response = await fire.auth().sendPasswordResetEmail(datas.email);
        console.log('response',response);
        
        return response;
    } catch (error) {
        return error;
    }
}
async function addNote(data) {
    try {
        console.log(data,"adfasdf");
        const datas={
            title: data.title,
            notes:data.notes
        }
        const response = await db.collection("Notes").doc().set(datas);
        return response;
    } catch (error) {
        return error;
    }
}
async function getNote() {
    try {
        const response = await db.collection("Notes").doc().get();
        return response;
    } catch (error) {
        return error
    }
}

export default {
    userRegistration,
    userLogin,
    emailVerify, userLogout,
    addNote,getNote
}