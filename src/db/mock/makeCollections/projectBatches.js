//Lots of logic here - we create the batches, set the completed records and checked records, 
//and update these in projects also...

import { faker } from '@faker-js/faker/locale/en_ZA';
import projects from './projects.js'
import projectParticipants from './projectParticipants.js'
import { makeID } from '../../../app/utils/makeID.js';

let projectBatches = {}

for (const project of Object.values(projects)) {
  const batches = []
  let batchNumber = 1
  
  while(batches.length < project.batchCount) {
    /**@type {import('../../../../types/ProjectBatch.js').ProjectBatch} */
    const batchRecord = {
      projectBatchID: makeID(),
      projectID: project.projectID,
      batchNumber,
      specimenCount: project.batchSize, //we fix the last one below
      claimedBy: null,
      claimedDate: null,
      recordsCaptured: 0,
      captureStartDate: null,
      captureEndDate: null,
      recordsChecked: 0,
      checkedBy: null,
      checkStartDate: null,
      checkEndDate: null
    }

    batches.push(batchRecord)
    batchNumber++
  }

  //the last batch must have the last few records, it's not a full batch
  if (project.specimenCount % project.batchSize) {
    batches.slice(-1)[0].specimenCount = (project.specimenCount % project.batchSize)
  }

  //if we have active participants...
  const participants = projectParticipants[project.projectID]
  if (participants.currentParticipants.length > 0 || participants.previousParticipants.length > 0) {
    
    //include the project creator...
    const contributors = [...participants.currentParticipants, ...participants.previousParticipants, project.createdBy]
    
    //get the number of batches completed
    const numberCompleted = faker.datatype.number({max: project.batchCount})
    const numberChecked =  faker.datatype.number({max: numberCompleted})

    project.batchesCaptured = numberCompleted
    project.batchesChecked = numberChecked

    for (let i = 0; i < numberCompleted; i++) {
      batches[i].recordsCaptured = batches[i].specimenCount
      batches[i].claimedBy = contributors[faker.datatype.number({max: contributors.length - 1})]
      batches[i].claimedDate = faker.date.between(project.createdDate, Date.now()).getTime()
      batches[i].captureStartDate = faker.date.between(batches[i].claimedDate, Date.now()).getTime()
      let minsToComplete = faker.datatype.number({max: 3000})
      batches[i].captureEndDate = batches[i].captureStartDate + (minsToComplete * 60 * 1000)

      project.capturedRecordCount += batches[i].specimenCount

      //add checked batches too
      if (i < numberChecked) {
        batches[i].recordsChecked = batches[i].specimenCount

        //the records must be checked by someone other than the person who captured them
        let checkedBy = null
        do {
          checkedBy = contributors[faker.datatype.number({max: contributors.length - 1})]
        }
        while(checkedBy == batches[i].claimedBy)

        batches[i].checkedBy = checkedBy

        //not perfect but it will do
        if (batches[i].captureEndDate > Date.now()) {
          batches[i].checkStartDate = Date.now()
        }
        else {
          batches[i].checkStartDate = faker.date.between(batches[i].captureEndDate, Date.now()).getTime()
        }

        let minsToComplete = faker.datatype.number({max: 1800})
        batches[i].checkEndDate = batches[i].checkStartDate + (minsToComplete * 60 * 1000)

        project.checkedRecordCount += batches[i].specimenCount
      }

    }

    //We need to add batches that are currently being checked...
    const completedButNotChecked = numberCompleted - numberChecked
    const numberPartiallyChecked = Math.min(completedButNotChecked, contributors.length)
    const partiallyChecked = batches.slice(numberChecked, numberChecked + numberPartiallyChecked)
    contributors.sort(() => 0.5 - Math.random())
    for (const [index, batch] of partiallyChecked.entries()) {
      batch.recordsChecked = faker.datatype.number({max: batch.specimenCount})
      batch.checkedBy = contributors[index]
      try {
        batch.checkStartDate = faker.date.between(batch.captureEndDate, Date.now()).getTime()
      }
      catch {
        batch.checkStartDate = Date.now()
      }
      project.checkedRecordCount += batch.recordsChecked
    }

    //And then batches that are being captured 
    const notCompleted = project.batchCount - numberCompleted
    const numberPartiallyCaptured = Math.min(notCompleted, contributors.length)
    const partiallyCaptured = batches.slice(numberCompleted, numberPartiallyCaptured)
    contributors.sort(() => 0.5 - Math.random()) //randomize them again
    for (const [index, batch] of partiallyCaptured.entries()) {
      batch.recordsCaptured = faker.datatype.number({max: batch.specimenCount})
      batch.claimedBy = contributors[index]
      batch.claimedDate = faker.date.between(project.createdDate, Date.now()).getTime()
      batch.captureStartDate = faker.date.between(batch.claimedDate, Date.now()).getTime()
      project.capturedRecordCount += batch.recordsCaptured
    }

  }

  for (const batch of batches) {
    projectBatches[batch.projectBatchID] = batch
  }

}

export default projectBatches