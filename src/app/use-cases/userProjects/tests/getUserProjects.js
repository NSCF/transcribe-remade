import makeGetUserProjects from "../makeGetUserProjects.js";
import { faker } from '@faker-js/faker'
import db from '../../../db/index.js'

const users = await db.users.query()
const userIDs = users.map(x => x.userID)

const getUserProjects = makeGetUserProjects(db)
const userID = userIDs[faker.datatype.number({max: userIDs.length - 1})]

getUserProjects(userID, 'accepted')
.then(projects => {
  if(projects.length > 0) {
    console.log('successfully fetched', projects.length, 'projects for user', userID)
  }
  else {
    console.log('there are no projects for user', userID)
  }
})
.catch(err => {
  console.error('error fetching user projects:', err.message)
}) 