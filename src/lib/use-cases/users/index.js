import db from "../../db";
import makeSignUpUser from "./makeSignUpUser";
import makeSignInUser from "./makeSignInUser";
import makeUserUseCases from "./makeUserUseCases";

const userUseCases = makeUserUseCases(db)
const {createUserProfile, getUserProfile} = userUseCases
const signUpUser = makeSignUpUser(userUseCases.createUserProfile)
const signInUser = makeSignInUser(userUseCases.getUserProfile)

userUseCases.signUpUser = signUpUser
userUseCases.signInUser = signInUser

export default userUseCases

export {
  signUpUser,
  signInUser,
  createUserProfile,
  getUserProfile
}