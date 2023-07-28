import normalizeEmail from "../../utils/normalizeEmail"

export default function(db) {
  return async function createUserProfile(userID, profileData) {
    
    if (!userID || !profileData) {
      throw new Error('invalid values passed to createUserProfile')
    }

    profileData.userID = userID
    profileData.searchEmail = normalizeEmail(profileData.email)
    try {
      await db.setRecord('users', profileData.userID, profileData)
      return profileData
    }
    catch(err) {
      throw err
    }
  }
}