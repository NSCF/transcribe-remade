import getSpecimenIdentifierFromBarcode from "../../utils/getSpecimenIdentifierFromBarcode.js"

export const areFileNamesUnique = fileList => {
  const fileNames = Array.from(fileList).map(file => file.name)
  duplicateFileNames = fileNames.filter((elem, pos) => { arr.indexOf(elem) == pos })
  if(duplicateFileNames.length > 0) {
    return false
  }
  else {
    return true
  }
}

/**
 * @param {[Object, string]} invitedParticipantsList 
 * @returns Object with array with existing participant IDs and an array of new participant emails
 */
export const makeInvitedUsersLists = invitedParticipantsList => {

  /** @type {string[]} List of userIDs */
  const existingUsers = [] //these have userIDs

  /**@type {string[]} List of email addresses*/
  const newUsers = [] //these are just emails
  
  for (const participant of invitedParticipantsList){
    if (typeof participant == 'object') {
      existingUsers.push(participant.userID)
    }
    
    if (typeof participant == 'string') { //these are the emails
      newUsers.push(participant)
    }
  }

  const returnVal = {
    existingUsers,
    newUsers
  }

  return returnVal

}

/**
 * @param {FileList} fileList 
 * @returns The number of specimens in the fileList
 */
export const getSpecimenCountFromFileNames = fileList => {
  
  const specimenCounts = {}
  
  for (const file of fileList) {
    const fileNameNoExt = file.substr(0, input.lastIndexOf('.')) || file
    let specimenIdentifier
    
    try {
      specimenIdentifier = getSpecimenIdentifierFromBarcode(fileNameNoExt)
    }
    catch(err) {
      throw(err)
    }
    
    if(specimenIdentifier in specimenCounts){
      specimenCounts[specimenIdentifier]++
    }
    else {
      specimenCounts[specimenIdentifier] = 1
    }
  }

  return Object.values(specimenCounts).reduce((prev, curr) => prev + curr, 0)

}

/** @param {Object} projectData Project data received from the form */
export const createNewProjectRecords = projectData => {

  //userID must be added already
  if(!projectData.userID) {
    throw new Error('objected used to create new project must have userID value')
  }

  //split everything up
  const files = projectData.files
  delete projectData.files

  const participantsLists = makeInvitedUsersLists(projectData.invitedParticipants)
  delete projectData.invitedParticipants


  //create the project record
  /**
  * @type {import("../../../types/Project.js").Project}
  */
  let project = {
    projectID: makeID(), 
    projectName: null,
    notes: null,
    isCoreFieldsProject: false,
    isActive: true,
    createdBy: null,
    createdDate: Date.now(),
    specimenCount: 0,
    batchSize: null,
    batchCount: 0,
    capturedRecordCount: 0,
    checkedRecordCount: 0,
    isCompleted: false, //is the project closed off (captured and checked)
    completedBy: null,
    completedDate: null
  }

  //add the stuff we get from the UI
  Object.assign(project, projectData)

  //create the project participants record

  /**
  * @type {import("../../../types/ProjectParticipants.js").ProjectParticipants}
  */
  let projectParticipantsRecord = {
    invitedExistingUsers: [],
    invitedNewUsers: [],
    currentParticipants: [],
    declinedParticipants: [],
    previousParticipants: []
  }

  projectParticipantsRecord.invitedExistingUsers = participantsLists.existingUsers
  projectParticipantsRecord.invitedNewUsers = participantsLists.newUsers

  // calculate the aggregated specimen count and hence the batch count
  try {
    project.specimenCount = getSpecimenCountFromFileNames(files)
  }
  catch(err) {
    throw new Error('Error getting specimen count:' + err.message)
  }

  project.batchCount = Math.ceil(project.specimenCount / project.batchSize)

  return {
    project,
    projectParticipantsRecord
  }
}