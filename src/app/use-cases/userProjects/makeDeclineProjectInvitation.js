const makeDeclineProjectInvitation =  (db) => {
  return async function declineProjectInvitation(userID, projectID) {

    let userProjectsUpdate
    let invitedParticipantsUpdate
    let declinedParticipantsUpdate
  
    userProjectsUpdate = db.userProjects.removeProject(userID, 'invitedProjects', projectID)
    invitedParticipantsUpdate = db.projectParticipants.removeUser(projectID, 'invitedUsers', userID)
    declinedParticipantsUpdate = db.projectParticipants.addUser(projectID, 'declinedParticipants', userID)
  
    try {
      await Promise.all([userProjectsUpdate, invitedParticipantsUpdate, declinedParticipantsUpdate])
    }
    catch(err) {
      throw err
    }
  
    return
    
  }

}

export default makeDeclineProjectInvitation