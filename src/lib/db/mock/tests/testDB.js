//make sure that the fake records all match up
//TODO this is not complete, currently users and user projects only...

import projects from "../projects.js"
import projectBatches from "../projectBatches.js"
import projectParticipants from "../projectParticipants.js"
import userProjects from "../userProjects.js"
import users from "../users.js"

//check user projects are all existing projects
for (const [userID, user] of Object.entries(users)) {
  
  const thisUserProjects = userProjects[userID]
  
  if(thisUserProjects) {
    //check project exists and lists the user as a participant
    for (const projectID of thisUserProjects.currentProjects) {
      if(!projectID in projects) {
        throw new Error('projectID exists for user but not in projects list')
      }
      else {
        const participants = projectParticipants[projectID]
        if (userID in participants.currentParticipants) {
          throw new Error('user', userID, 'is listed for project', projectID, 'but not in project participants list')
        }
      }
    }
    for (const projectID of thisUserProjects.invitedProjects) {
      if(!projectID in projects) {
        throw new Error('projectID exists for user but not in projects list')
      }
      else {
        const participants = projectParticipants[projectID]
        if (userID in participants.invitedUsers) {
          throw new Error('user', userID, 'is invited for project', projectID, 'but not in project participants list')
        }
      }
    }
  }
}

console.log('all done')

