import firebase from 'firebase'
import fire from '../config/firebaseConfig'
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
import service from '../services/constant'
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
            password: data.password,
        }
        const response = await fire.auth().signInWithEmailAndPassword(datas.email, datas.password)
        const userDetails = await service.firestore.collection("users").doc(response.user.uid).get().then(async function (doc) {
            console.log(response.user.uid,"kjadhsfga");
            
            const userData = {
                email: service.firebaseAuthorization.currentUser.email,
                fname: doc.data().firstName,
                lname: doc.data().lastName,
                userId:response.user.uid    
            }
            let token =await jwt.sign(userData, service.firebaseAuthorization.currentUser.uid, {
                expiresIn:1440
            })
            let tokenSet = await localStorage.setItem('usertoken', token)
            console.log(tokenSet,"khadgsfjg",token);
            
        })
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
        let getToken = localStorage.usertoken
        console.log(getToken,"ldahsfkjh");
        
        let data = jwt_decode("usertoken")
        console.log(data);
        
        const response = await db.collection("Notes").where("user_id","==",jwt_decode.userId).get();
        let token = localStorage.getItem("usertoken");
        console.log(token,"lkfskj");
        
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