import projectParticipants from "./projectParticipants.js";
import users from "./users.js";

/**@type {Object<string, import("../../../types/UserProjects.js").UserProjects>} */
const userProjects = {}

//make sure we have a userProjects record for all users...
for (const user of Object.values(users)) {
  userProjects[user.userID] = {
    currentProjects: [],
    invitedProjects: []
  }
}

for (const [projectID, participants] of Object.entries(projectParticipants)) {
  
  for (const userID of participants.invitedUsers) {
    userProjects[userID].invitedProjects.push(projectID)
  }

  for (const userID of participants.currentParticipants) {
    userProjects[userID].currentProjects.push(projectID)
  }

}

export default userProjects