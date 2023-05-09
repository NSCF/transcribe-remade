//Interactors/ use cases for users

import { userProjects, projectParticipants } from "../db"


const addInvitedProject = async (userID, projectID) => {
  //check if the UserProject already exists
  let projectLists
  try {
    projectLists = await userProjects.get(userID)
  }
  catch(err) {
    throw err
  }

  if(projectLists) {
    try {
      await userProjects.arrayAppend(userID, 'invitedProjects', projectID)
    }
    catch(err) {
      throw err
    }
  }
  else {
    const record = {
      acceptedProjects: [],
      invitedProjects: [projectID]
    }
    try {
      await userProjects.set(userID, record)
    }
    catch(err) {
      throw err
    }
  }

}

const acceptProjectInvitation = async (userID, projectID) => {
  //move the project from invited to accepted
  //the project has to exist, so we won't check for it
  try {
    await userProjects.arrayRemove(userID, 'invitedProjects', projectID)
  }
  catch(err) {
    throw err
  }

  try {
    await userProjects.arrayAppend(userID, 'acceptedProjects', projectID)
  }
  catch(err) {
    throw err
  }

  try {
    await projectParticipants.arrayRemove(projectID, 'invitedUsers', userID)
  }
  catch(err) {
    throw err
  }

  try {
    await projectParticipants.arrayAppend(projectID, 'currentParticipants', userID)
  }
  catch(err) {
    throw err
  }

}

const rejectProjectInvitation = async (userID, projectID) => {
  try {
    await userProjects.arrayRemove(userID, 'invitedProjects', projectID)
  }
  catch(err) {
    throw err
  }

  try {
    await projectParticipants.arrayRemove(projectID, 'invitedUsers', userID)
  }
  catch(err) {
    throw err
  }

  try {
    await projectParticipants.arrayAppend(projectID, 'declinedParticipants', userID)
  }
  catch(err) {
    throw err
  }
}

const leaveProject = async (userID, projectID) => {
  try {
    await userProjects.arrayRemove(userID, 'acceptedProjects', projectID)
  }
  catch(err) {
    throw err
  }

  try {
    await projectParticipants.arrayRemove(projectID, 'currentParticipants', userID)
  }
  catch(err) {
    throw err
  }

  try {
    await projectParticipants.arrayAppend(projectID, 'previousParticipants', userID)
  }
  catch(err) {
    throw err
  }
}


export { 
  addInvitedProject, 
  acceptProjectInvitation, 
  rejectProjectInvitation, 
  leaveProject
}