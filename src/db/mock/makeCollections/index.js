//run all the data generation scripts to make data files
// these data files will be read when creating mockDB

import * as fs from 'fs/promises';
import projects from "./projects.js"
import projectBatches from "./projectBatches.js"
import projectParticipants from "./projectParticipants.js"
import userProjects from "./userProjects.js"
import users from "./users.js"

await fs.writeFile('../collectionDataFiles/projects.json', JSON.stringify(projects, null, 2))
await fs.writeFile('../collectionDataFiles/projectBatches.json', JSON.stringify(projectBatches, null, 2))
await fs.writeFile('../collectionDataFiles/projectParticipants.json', JSON.stringify(projectParticipants, null, 2))
await fs.writeFile('../collectionDataFiles/userProjects.json', JSON.stringify(userProjects, null, 2))
await fs.writeFile('../collectionDataFiles/users.json', JSON.stringify(users, null, 2))
