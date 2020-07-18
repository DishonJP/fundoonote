import firebase from 'firebase'
import fire from '../config/firebaseConfig'
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
import service from '../services/constant'
const db = firebase.firestore();

const userRegistration = async (data) => {
    try {
        const response = await fire.auth().createUserWithEmailAndPassword(data.email, data.password);
        const datas = {
            curUser: response.user.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        }
        db.collection("users").doc(response.user.uid).set(datas);
        const colData = {
            curUser: datas.curUser,
            email: datas.email
        }
        db.collection("collaborator").doc().set(colData);
        return response
    } catch (err) {
        return err;
    }
}

const userLogin = async (data) => {
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
                userId: response.user.uid
            }
            let token = await jwt.sign(userData, service.firebaseAuthorization.currentUser.uid, {
                expiresIn: 1440
            })
            localStorage.setItem('usertoken', token);
            localStorage.setItem("firstName", userData.fname);
            localStorage.setItem("lastName", userData.lname);
            localStorage.setItem("email", userData.email)
        })
        return response
    } catch (err) {
        return err;
    }
}
const userLogout = async () => {
    try {
        const response = await fire.auth().currentUser.signOut();
        localStorage.clear();
        return response;
    } catch (error) {
        return error;
    }
}
const emailVerify = async (data) => {
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
const addNote = async (data) => {
    try {
        const datas = {
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
const addColab = async (data) => {
    try {
        const datas = {
            curUser: data.id,
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
const getNote = async () => {
    try {
        let getNotes = [];
        let getToken = localStorage.getItem("usertoken");
        let data = jwt_decode(getToken)
        await db.collection('Notes').where("curUser", '==', data.userId).get().then(function (querySnapShot) {
            querySnapShot.forEach(function (doc) {
                getNotes.push(doc);
            })
        })
        return getNotes;
    } catch (error) {
        return error
    }
}
const binNotes = async (data) => {
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
        inputbcolor: data.inputbcolor
    }
    await db.collection("Notes").doc(data.id).update(datas).then((res) => {
        console.log(res, "how lol");
    }).catch((err) => {
        console.log(err, "oooh no");
    })
}
const addLabel = async (data) => {
    try {
        const datas = {
            curUser: fire.auth().currentUser.uid,
            notelabel: data.label
        }
        let count = 0;
        let label = getLabel();
        await label.then(el => {
            for (let i = 0; i < el.length; i++) {
                if (el[i] == datas.notelabel) {
                    count++
                }
            }
        })
        if (count === 0 && datas.notelabel !== "") {
            const response = await db.collection("label").doc().set(datas);
            return response;
        }

    } catch (error) {
        return error;
    }
}
const getLabel = async () => {
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

const deleteNote = async (data) => {
    await db.collection("Notes").doc(data.id).delete().then((res) => console.log("done deleting"))
}

const deletelabel = async (data) => {
    await db.collection("label").doc(data.id).delete().then((res) => console.log("done deleting"))
}

const updateLabel = async (data) => {
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
        inputbcolor: data.inputbcolor
    }
    await db.collection("label").doc(data.id).update(datas).then((res) => {
        console.log(res, "how lol");
    }).catch((err) => {
        console.log(err, "oooh no");
    })
}

const getCollaborator = async () => {
    let colData = []
    await db.collection("collaborator").get().then((data) => {
        data.forEach(el => {
            colData.push(el.data())
        })
    })
    return colData;
}
export default {
    userRegistration,
    userLogin,
    emailVerify, userLogout,
    addNote, getNote, binNotes, deleteNote, addLabel, getLabel, deletelabel, updateLabel, getCollaborator, addColab
}