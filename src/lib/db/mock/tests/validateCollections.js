//make sure that the fake records all match up
//TODO this is not complete, currently users and user projects only...

import projects from "../collectionDataFiles/projects.json"
import projectBatches from "../collectionDataFiles/projectBatches.json"
import projectParticipants from "../collectionDataFiles/projectParticipants.json"
import userProjects from "../collectionDataFiles/userProjects.json"
import users from "../collectionDataFiles/users.json"

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

