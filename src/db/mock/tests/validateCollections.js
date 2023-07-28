//make sure that the fake records all match up
//TODO this is not complete, currently users and user projects only...

import projects from "../collectionDataFiles/projects.json" assert {type: 'json'}
import projectBatches from "../collectionDataFiles/projectBatches.json" assert {type: 'json'}
import projectParticipants from "../collectionDataFiles/projectParticipants.json" assert {type: 'json'}
import userProjects from "../collectionDataFiles/userProjects.json" assert {type: 'json'}
import users from "../collectionDataFiles/users.json" assert {type: 'json'}

//check user projects are all existing projects
for (const userID of Object.keys(users)) {
  
  const thisUserProjects = userProjects[userID]
  
  if(thisUserProjects) {
    //check project exists and lists the user as a participant
    for (const projectID of thisUserProjects.currentProjects) {
      if(!projectID in projects) {
        console.error('projectID', projecID, 'exists for user', userID,  'but project does not exist')
      }
      else {
        const participants = projectParticipants[projectID]
        if (userID in participants.currentParticipants) {
          console.error('user', userID, 'is listed for project', projectID, 'but not in project participants list')
        }
      }
    }
    for (const projectID of thisUserProjects.invitedProjects) {
      if(!projectID in projects) {
        console.error('projectID exists for user but not in projects list')
      }
      else {
        const participants = projectParticipants[projectID]
        if (userID in participants.invitedUsers) {
          console.error('user', userID, 'is invited for project', projectID, 'but not in project participants list')
        }
      }
    }
  }
  else {
    console.error('')
  }
}

console.log('all done')

