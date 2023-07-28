const makeAddInvitedProject = async (db) => {
  return async function addInvitedProject(userID, projectID){

    //check if the UserProjects record already exists
    let projectLists
    try {
      projectLists = await db.userProjects.get(userID)
    }
    catch(err) {
      throw err
    }
  
    let projectListsUpdate
    let declinedParticipantsUpdate
    let previousParticipantsUpdate
  
    if(projectLists) {
      
      projectListsUpdate = db.userProjects.addProject(userID, 'invitedProjects', projectID)
  
    }
    else {
      const record = {
        currentProjects: [],
        invitedProjects: [projectID]
      }
  
      projectListsUpdate = db.userProjects.set(userID, record)
  
    }
  
    //double check this is not a declineduser
    declinedParticipantsUpdate = db.projectParticipants.removeUser(projectID, 'declinedParticipants', userID)
  
    //or a previous user
    previousParticipantsUpdate = db.projectParticipants.removeUser(projectID, 'previousParticipants', userID)
  
    try {
      await Promise.all([projectListsUpdate, declinedParticipantsUpdate, previousParticipantsUpdate])
    }
    catch(err) {
      throw err
    }

  }
  

}

export default makeAddInvitedProject