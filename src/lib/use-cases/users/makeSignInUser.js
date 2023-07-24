import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function(getUserProfile) {
  return async function(email, password){
    
    //authenticate
    const auth = getAuth();
    let userCredential
    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password)
    }
    catch(err) {
      throw err
    } 
    
    //retrieve profile
    let userProfile
    try {
      userProfile = await getUserProfile(userCredential.userID)
    }
    catch(err) {
      throw err
    }

    userProfile.userCredential = userCredential
    return userProfile

  }
} 


