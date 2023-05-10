const leaveProject = async (db, userID, projectID) => {

  let userProjectsUpdate
  let currentParticipantsUpdate
  let previousParticipantsUpdate

  userProjectsUpdate = db.userProjects.removeProject(userID, 'acceptedProjects', projectID)
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

export default leaveProject