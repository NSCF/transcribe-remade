import db from '$db'
import makeCreateProject from "./makeCreateProject.js";
import uploadProjectImage from './uploadProjectImage.js'
import makeCloseProject from "./makeCloseProject.js";

const createProject = makeCreateProject(db)
const closeProject = makeCloseProject(db)

export {
  createProject, 
  closeProject,
  uploadProjectImage
}