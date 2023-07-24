import db from '../../db/index.js'
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