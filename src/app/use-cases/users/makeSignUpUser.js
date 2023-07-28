import { getAuth, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";

export default function(createUserProfile) {
  return async function(userData) {
  
    //first create the firebase account
    const auth = getAuth();
    let userCredential
    try {
      userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    }
    catch(err) {
      throw(err)
    }

    //then create the user profile
    let userProfile
    try {
      userProfile = await createUserProfile(userCredential.userID, userData)
    }
    catch(err) {
      //we need to delete the firebase user here because signup is unsuccessful
      await deleteUser(auth.currentUser) //assuming this will be successful if the above was successful...
      throw(err)
    }

    userProfile.userCredential = userCredential

    return userProfile
      
  }
} 