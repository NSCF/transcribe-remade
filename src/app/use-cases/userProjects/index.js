// interactors/use cases for user Projects
import db from '../../../db'
import makeAddInvitedProject from '../userProjects/makeAddInvitedProject.js'
import makeGetUserProjects from './makeGetUserProjects.js'
import makeAcceptProjectInvitation from "./makeAcceptProjectInvitation.js"
import makeDeclineProjectInvitation from "./makeDeclineProjectInvitation.js"
import makeLeaveProject from "./makeLeaveProject.js"

const addInvitedProject = makeAddInvitedProject(db)
const getUserProjects = makeGetUserProjects(db)
const acceptProjectInvitation = makeAcceptProjectInvitation(db)
const declineProjectInvitation = makeDeclineProjectInvitation(db)
const leaveProject = makeLeaveProject(db)

export { 
  addInvitedProject,
  getUserProjects,
  acceptProjectInvitation,
  declineProjectInvitation,
  leaveProject
}