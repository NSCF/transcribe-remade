const makeCloseProject = (db) => {
  return async function closeProject(projectID, userID) {
    
    const participants = await projectParticipants.get(projectID)
    
    //update the project
    await db.projects.update(projectId, {
      isCompleted: true,
      completedBy: userID,
      completedDate: Date.now()
    })
  
    //update the user projects lists
    for (const userID of participants.invitedUsers) {
      await db.userProjects.removeProject(userID, 'invited', projectID)
    }
  
    for (const userID of participants.currentParticipants) {
      await db.userProjects.removeProject(userID, 'current', projectID)
    }
  
    return
    
  }

}

export default makeCloseProject