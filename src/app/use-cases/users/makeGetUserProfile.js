export default function(db) {
  return async function getUserProfile(userID) {
    try {
      await db.getRecord('users', userID)
    }
    catch(err) {
      throw err
    }
  }
}