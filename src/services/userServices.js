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
        const response = await fire.auth().createUserWithEmailAndPassword(data.email, data.password);
        db.collection("users").doc(response.user.uid).set(datas);
        console.log(response,"sgdfgkjafau");
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
            let tokenSet = localStorage.setItem('usertoken', token)
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
            curUser: fire.auth().currentUser.uid,
            title: data.title,
                notes: data.notes,
                trash: data.trash,
                backcolor: data.backcolor,
                inputbcolor: data.inputbcolor,
                archive: data.archive,
                pin: data.pin,
                remainder: data.remainder,
                notelabel: data.notelabel
        }
        const response = await db.collection("Notes").doc().set(datas);
        return response;
    } catch (error) {
        return error;
    }
}
async function getNote() {
    try {
        let getNotes = [];
        let getToken = localStorage.getItem("usertoken");
        let data = jwt_decode(getToken)
        await db.collection('Notes').where("curUser", '==', data.userId).get().then(function (querySnapShot) {
        console.log(querySnapShot,"poiu");
        
            querySnapShot.forEach(function(doc){
                console.log(doc.data(),"kjadhfkjahs");
                
                getNotes.push(doc);
            })
        })
        console.log(getNotes,"lk123fskj");
        
        return getNotes;
    } catch (error) {
        return error
    }
}
async function getUserData() {
    let data = localStorage.getItem("users");
    return data;
}
async function binNotes(data) {
    let datas = {
        curUser: fire.auth().currentUser.uid,
        trash:data.trash
    }
    console.log(data.id,"id");
    await db.collection("Notes").doc(data.id).update(datas).then((res) => {
       console.log(res,"how lol");
    }).catch((err) => {
       console.log(err,"oooh no");
   })
}
async function addArchive(data) {
    let datas = {
        title: data.title,
        notes: data.notes,
        curUser: fire.auth().currentUser.uid,
        trash: data.trash,
        backcolor: data.backcolor,
        inputbcolor:data.inputbcolor
    }
    await db.collection("Archive").doc().set(datas)
}
async function getArchiveNotes() {
    try {
        let getNotes = [];
        let getToken = localStorage.getItem("usertoken");
        let data = jwt_decode(getToken)
        await db.collection('Archive').where("curUser", '==', data.userId).get().then(function (querySnapShot) {
        console.log(querySnapShot,"poiu");
            querySnapShot.forEach(function(doc){
                getNotes.push(doc);
            })
        })
        return getNotes;
    } catch (error) {
        return error
    }
}
export default {
    userRegistration,
    userLogin,
    emailVerify, userLogout,
    addNote,getNote,getUserData,binNotes,addArchive,getArchiveNotes
}