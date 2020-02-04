import fire from '../config/firebaseConfig'
const service = {
    firebaseAuthorization: fire.auth(),
    firestore:fire.firestore()
}
export default service