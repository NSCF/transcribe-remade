import { error } from '@sveltejs/kit';
import db from '../../../db'


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (params.slug) {

    const projectID = params.slug
    let project
    let projectBatches
    let projectBatchUsers

    console.log('project id:', projectID)

    try {
      project = await db.projects.get(projectID)
    }
    catch(err) {
      throw error(404, {
          message: `project record not found: ${err.message}`
      });
    }

    try {
      projectBatches = await db.projectBatches.search({projectID})
    }
    catch(err) {
      throw error(404, {
          message: `project batches not found: ${err.message}`
      });
    }

    //get the users for each batch
    const userIDSet = new Set()
    for (const projectBatch of projectBatches){
        
      if (projectBatch.capturedBy){
          userIDSet.add(projectBatch.capturedBy)
      }

      if (projectBatch.checkedBy){
        userIDSet.add(projectBatch.checkedBy)
      }

    }

    const userIDs = Array.from(userIDSet)
    let errors = false
    const users = {}
    if (userIDs.length) {
      
      for (const userID of userIDs) {
        try {
          users[userID] = await db.users.get(userID)
        }
        catch(err) {
          errors = true
          console.error(err)
        }
      }
    }

    if (errors) {
      alert('there were errors fetching batch users')
    }

    //add the users into the projectBatch objects
    //note this changes the shape of projectBatch
    for (const projectBatch of projectBatches) {
      if(projectBatch.claimedBy) {
        projectBatch.claimedBy = users[projectBatch.claimedBy]
      }

      if (projectBatch.checkedBy) {
        projectBatch.checkedBy = users[projectBatch.checkedBy]
      }

    }

    if(project && projectBatches.length){

      return {
        project, 
        projectBatches
      }
    }
  }

  throw error(404, {
    message: 'Not found'
  });
}