

const acceptProjectInvitation = async (db, userID, projectID) => {
  
  
  let invitedProjectsUpdate
  let acceptedProjectsUpdate
  let invitedUsersUpdate
  let currentParticipantsUpdate

  invitedProjectsUpdate = db.userProjects.removeProject(userID, 'invitedProjects', projectID)
  acceptedProjectsUpdate = db.userProjects.addProject(userID, 'acceptedProjects', projectID)
  invitedUsersUpdate = db.projectParticipants.removeUser(projectID, 'invitedUsers', userID)
  currentParticipantsUpdate = db.projectParticipants.addUser(projectID, 'currentParticipants', userID)

  try {
    await Promise.all([invitedProjectsUpdate, acceptedProjectsUpdate, invitedUsersUpdate, currentParticipantsUpdate])
  }
  catch(err) {
    throw err
  }

  return

}

export default acceptProjectInvitation