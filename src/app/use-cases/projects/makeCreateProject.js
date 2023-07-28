//Interactors/use cases related to creating and managing projects

import { addInvitedProject } from '../userProjects/index.js'

/**
 * @param {string[]} userIDs The list of UIDs and normalized email addresses for invited participants
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

  return
}

const makeCreateProject = async (db) => {

  /**
   * @param {Object} projectData The project data record
   * @param {string[]} projectParticipants A list of userIDs and normalized email addresses
   */
  return async function createProject(projectData, projectParticipantsList) {

    /**@type {import('../../../types/ProjectParticipants.js').ProjectParticipants} */
    const projectParticipants = {
      invitedUsers: projectParticipantsList,
      currentParticipants: [],
      declinedParticipants: [],
      previousParticipants: []
    }


    
    //save the project and participants data
    try {
      await Promise.all([
        updateInvitedParticipantsProjectsLists(allIDs, projectID),
        db.projects.set(project.projectID, project),
        db.projectParticipants.set(project.projectID, projectParticipantsRecord)
      ])
    }
    catch(err) {
      throw new Error('Error saving project data:', err.message)
    }
  
    return project

  }

}

export default makeCreateProject

