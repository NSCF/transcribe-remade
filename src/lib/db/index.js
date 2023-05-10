import firestore from './firebase/firestore.js'

const projects = firestore.projects
const projectBatches = firestore.projectBatches
const projectParticipants = firestore.projectParticipants
const specimenImages = firestore.specimenImages
const specimens = firestore.specimens
const userProfiles = firestore.userProfiles
const userProjects = firestore.userProjects

const db = {
  projects,
  projectBatches, 
  projectParticipants,
  specimenImages,
  specimens,
  userProfiles,
  userProjects
}

export default db