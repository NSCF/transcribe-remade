//Interactors/use cases related to creating and managing projects

import addInvitedProject from './addInvitedProject.js'
import { createNewProjectRecords } from './interactorUtils.js'


/**
 * @param {string[]} userIDs The list of UIDs and email addresses for invited participants
 */
const updateInvitedParticipantsProjectsLists = async (db, userIDs, projectID) => {
  for (const userID of userIDs) {
    try {
      await addInvitedProject(db, userID, projectID)
    }
    catch(err) {
      throw err
    }
  }
}

const createProject = async (db, projectData) => {

  const { project , projectParticipantsRecord } = createNewProjectRecords(projectData)

  //update each participant's projects
  const allIDs = [...projectParticipantsData.invitedExistingUsers, ...projectParticipantsData.invitedNewUsers]
  
  try {
    await updateInvitedParticipantsProjectsLists(db, allIDs, projectID)
  }
  catch(err) {
    throw new Error('Error updating invited participants project lists: ' + err.message)
  }
  
  //save the project and participants data
  try {
    await Promise.all([
      db.projects.set(project.projectID, project),
      db.projectParticipants.set(project.projectID, projectParticipantsRecord)
    ])
  }
  catch(err) {
    throw new Error('Error saving project data:', err.message)
  }

  return project

}

export default createProject

