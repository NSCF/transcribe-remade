import makeCreateUserProfile from "./makeCreateUserProfile";
import makeGetUserProfile from "./makeGetUserProfile";

export default function makeUserUseCases(db) {
  const createUserProfile = makeCreateUserProfile(db)
  const getUserProfile = makeGetUserProfile(db)
  
  return {
    createUserProfile,
    getUserProfile
  }
}