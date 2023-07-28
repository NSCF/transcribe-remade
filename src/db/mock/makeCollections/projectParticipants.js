import users from './users.js'
import projects from './projects.js'

/**@type {Object<string, import('../../../types/ProjectParticipants.js').ProjectParticipants>} */
const projectParticipants = {}

const userList = Object.values(users)

for (const project of Object.values(projects)) {
  //shuffle the users...
  userList.sort(() => 0.5 - Math.random())

  /**@type {import('../../../types/ProjectParticipants.js').ProjectParticipants} */
  const participants = {}
  
  const numInvited = Math.floor(Math.random() * 5)
  participants.invitedUsers = userList.slice(0, numInvited).map(x => x.userID)

  const numParticipating = Math.floor(Math.random() * 5)
  participants.currentParticipants = userList.slice(numInvited, numInvited + numParticipating).map(x => x.userID)

  const numDeclined = Math.floor(Math.random() * 5)
  participants.declinedParticipants = userList.slice(numInvited + numParticipating, numInvited + numParticipating + numDeclined).map(x => x.userID)

  const numPrevious = Math.floor(Math.random() * 5)
  participants.previousParticipants = userList.slice(numInvited + numParticipating + numDeclined, numInvited + numParticipating + numDeclined + numPrevious).map(x => x.userID)

  projectParticipants[project.projectID] = participants

}

export default projectParticipants