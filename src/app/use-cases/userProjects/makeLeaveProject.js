const makeLeaveProject = (db) => {
  return async function leaveProject(userID, projectID) {

    let userProjectsUpdate
    let currentParticipantsUpdate
    let previousParticipantsUpdate
  
    userProjectsUpdate = db.userProjects.removeProject(userID, 'currentProjects', projectID)
    currentParticipantsUpdate = db.projectParticipants.removeUser(projectID, 'currentParticipants', userID)
    previousParticipantsUpdate = db.projectParticipants.addUser(projectID, 'previousParticipants', userID)
  
    try {
      await Promise.all([userProjectsUpdate, currentParticipantsUpdate, previousParticipantsUpdate])
    }
    catch(err) {
      throw err
    }
  
    return
  
  }

}

export default makeLeaveProject