import firebase from 'firebase'
import fire from '../config/firebaseConfig'
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
import service from '../services/constant'
const db = firebase.firestore();
async function userRegistration(data) {
    try {
        const response = await fire.auth().createUserWithEmailAndPassword(data.email, data.password);
        const datas = {
            curUser:response.user.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        }
        db.collection("users").doc(response.user.uid).set(datas);
        return response
    } catch (err) {
        return err;
    }
}

async function userLogin(data) {
    try {
        const datas = {
            email: data.email,
            password: data.password,
        }
        const response = await fire.auth().signInWithEmailAndPassword(datas.email, datas.password)
        await service.firestore.collection("users").doc(response.user.uid).get().then(async function (doc) {
            const userData = {
                email: service.firebaseAuthorization.currentUser.email,
                fname: doc.data().firstName,
                lname: doc.data().lastName,
                userId:response.user.uid    
            }
            let token =await jwt.sign(userData, service.firebaseAuthorization.currentUser.uid, {
                expiresIn:1440
            })
            localStorage.setItem('usertoken', token);
            localStorage.setItem("firstName", userData.fname);
            localStorage.setItem("lastName", userData.lname);
            localStorage.setItem("email",userData.email)
        })
        return response
    } catch (err) {
        return err;
    }
}
async function userLogout(){
    try {
        const response = await fire.auth().currentUser.signOut();
        localStorage.clear();
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
        return response;
    } catch (error) {
        return error;
    }
}
async function addNote(data) {
    try {
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
                notelabel: data.label
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
            querySnapShot.forEach(function(doc){   
                getNotes.push(doc);
            })
        })
        return getNotes;
    } catch (error) {
        return error
    }
}
async function binNotes(data) {
    let datas = {
        curUser: fire.auth().currentUser.uid,
        trash: data.trash,
        title: data.title,
        notes: data.notes,
        pin: data.pin,
        notelabel: data.label,
        archive: data.archive,
        remainder: data.remainder,
        backcolor: data.backcolor,
        inputbcolor:data.inputbcolor
    }
    await db.collection("Notes").doc(data.id).update(datas).then((res) => {
       console.log(res,"how lol");
    }).catch((err) => {
       console.log(err,"oooh no");
   })
}
async function addLabel(data) {
    try {
        const datas={
            curUser: fire.auth().currentUser.uid,
                notelabel: data.label
        }
        let count = 0;
        let label = getLabel();
        await label.then(el => {
            for (let i = 0; i < el.length; i++) {
                if (el[i]==datas.notelabel) {
                    count++
                }
            }
        })
        if (count === 0 && datas.notelabel!=="") {
            const response = await db.collection("label").doc().set(datas);
        return response;
        }
        
    } catch (error) {
        return error;
    }
}
async function getLabel() {
    try {
        let getLabel = [];
        
        let getToken = localStorage.getItem("usertoken");
        let data = jwt_decode(getToken)
        await db.collection('label').where("curUser", '==', data.userId).get().then(function (querySnapShot) {
            querySnapShot.forEach(function (doc) {
                getLabel.push(doc.data().notelabel);
            })
        })
        return getLabel;
    } catch (error) {
        return error
    }
}
async function deleteNote(data) {
    await db.collection("Notes").doc(data.id).delete().then((res)=>console.log("done deleting"))
}
async function deletelabel(data) {
    await db.collection("label").doc(data.id).delete().then((res)=>console.log("done deleting"))
}
async function updateLabel(data) {
    let datas = {
        curUser: fire.auth().currentUser.uid,
        trash: data.trash,
        title: data.title,
        notes: data.notes,
        pin: data.pin,
        notelabel: data.label,
        archive: data.archive,
        remainder: data.remainder,
        backcolor: data.backcolor,
        inputbcolor:data.inputbcolor
    }
    await db.collection("label").doc(data.id).update(datas).then((res) => {
       console.log(res,"how lol");
    }).catch((err) => {
       console.log(err,"oooh no");
   })
}
async function getColabarator() {
    let data = service.firebaseAuthorization.tenantId
    alert(data)
}
export default {
    userRegistration,
    userLogin,
    emailVerify, userLogout,
    addNote,getNote,binNotes,deleteNote,addLabel,getLabel,deletelabel,updateLabel,getColabarator
}