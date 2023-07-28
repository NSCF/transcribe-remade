import projects from "../collectionDataFiles/projects.json" assert {type: 'json'}
import projectBatches from '../collectionDataFiles/projectBatches.json' assert {type: 'json'}

const perProject = {
  
}

for (const batch of Object.values(projectBatches)) {
  if (!perProject[batch.projectID]) {
    perProject[batch.projectID] = {
      projectName: projects[batch.projectID].projectName, 
      batchCount: 1
    }
  }
  else {
    perProject[batch.projectID].batchCount++
  }
}

for (const item of Object.values(perProject)){
  console.log(item.projectName, ':', item.batchCount)
}