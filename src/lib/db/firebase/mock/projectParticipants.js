import users from './users.js'
import projects from './projects.js'

/**@type {Object<string, import('../../../../types/ProjectParticipants.js').ProjectParticipants>} */
const projectParticipants = {}

//randomize users

for (const project of projects) {
  //shuffle the users...
  users.sort(() => 0.5 - Math.random())

  /**@type {import('../../../../types/ProjectParticipants.js').ProjectParticipants} */
  const participants = {}
  
  const numInvited = Math.floor(Math.random() * 5)
  participants.invitedUsers = users.slice(0, numInvited).map(x => x.userID)

  const numParticipating = Math.floor(Math.random() * 5)
  participants.currentParticipants = users.slice(numInvited, numInvited + numParticipating).map(x => x.userID)

  const numDeclined = Math.floor(Math.random() * 5)
  participants.declinedParticipants = users.slice(numInvited + numParticipating, numInvited + numParticipating + numDeclined).map(x => x.userID)

  const numPrevious = Math.floor(Math.random() * 5)
  participants.previousParticipants = users.slice(numInvited + numParticipating + numDeclined, numInvited + numParticipating + numDeclined + numPrevious).map(x => x.userID)

  projectParticipants[project.projectID] = participants

}

export default projectParticipants