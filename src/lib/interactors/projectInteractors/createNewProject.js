//Interactors/use cases related to creating and managing projects
import { projects, projectParticipants } from "$lib/db"
import { makeID } from '../../utils/makeID.js'
import { addInvitedProject } from '../userProjectInteractors.js'
import { createNewProjectRecords } from './interactorUtils.js'


/**
 * @param {string[]} userIDs The list of UIDs and email addresses for invited participants
 */
const updateInvitedParticipantsProjectsLists = async (userIDs, projectID) => {
  for (const userID of userIDs) {
    try {
      await addInvitedProject(userID, projectID)
    }
    catch(err) {
      throw err
    }
  }
}

const createProject = async (projectData) => {

  const { project , projectParticipantsRecord } = createNewProjectRecords(projectData)

  //update each participant's projects
  const allIDs = [...projectParticipantsData.invitedExistingUsers, ...projectParticipantsData.invitedNewUsers]
  try {
    await updateInvitedParticipantsProjectsLists(allIDs)
  }
  catch(err) {
    throw new Error('Error updating invited participants project lists: ' + err.message)
  }
  
  //save the project and participants data
  try {
    await Project.all([
      projects.set(project.projectID, project),
      projectParticipants.set(project.projectID, projectParticipantsRecord)
    ])
  }
  catch(err) {
    throw new Error('Error saving project data:', err.message)
  }

  return project

}

export default createProject

