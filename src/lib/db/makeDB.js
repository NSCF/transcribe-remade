export default function makeDB({
  getRecord, 
  addRecord,
  setRecord, 
  updateRecord, 
  deleteRecord, 
  queryCollection, 
  arrayAppend, 
  arrayRemove} = {}) {

  const projects = {
    get: projectID => getRecord('projects', projectID),
    set: (projectID, data) => setRecord('projects', projectID, data),
    update: (projectID, data) => updateRecord('projects', projectID, data),
    delete: projectID => deleteRecord('projects', projectID),
    query: queryParams => queryCollection('projects', queryParams), 
  }
  
  const projectBatches = {
    set: (projectBatchID, data) => setRecord('projectBatches', projectBatchID, data),
    update: (projectBatchID, data) => updateRecord('projectBatches', projectBatchID, data),
    delete: projectBatchID => deleteRecord('projectBatches', projectBatchID),
    query: queryParams => queryCollection('projectBatches', queryParams)
  }
  
  //this is one to one so we use the projectID as the ID field
  const projectParticipants = {
    get: projectID => getRecord('projectParticipants', projectID),
    set: (projectID, data) => setRecord('projectParticipants', projectID, data),
    delete: projectID => deleteRecord('projectParticipants', projectID),
    query: queryParams => queryCollection('projectParticipants', queryParams), 
    /**
     * @param {string} projectID 
     * @param {('invitedUsers'|'currentParticipants'|'declinedParticipants'|'previousParticipants')} list The list to add the user to
     * @param {*} userID The user ID to add to the list
     * @returns 
     */
    addUser: (projectID, list, userID) => arrayAppend('projectParticipants', projectID, list, userID),
    /**
     * @param {string} projectID 
     * @param {('invitedUsers'|'currentParticipants'|'declinedParticipants'|'previousParticipants')} list The list to remove the user from
     * @param {*} userID The user to remove
     * @returns 
     */
    removeUser: (projectID, list, userID) => arrayRemove('projectParticipants', projectID, list, userID)
  }
  
  const specimenImages = {
    //these get added by the server
    delete: specimenImageRecord => deleteRecord('specimenImages', specimenImageRecord),
    query: queryParams => queryCollection('specimenImages', queryParams) 
  }
  
  const specimens = {
    get: specimenRecordID => getRecord('specimens', specimenRecordID),
    set: (specimenRecordID, data) => setRecord('specimens', specimenRecordID, data),
    update: (specimenRecordID, data) => updateRecord('specimens', specimenRecordID, data),
    delete: specimenRecordID => deleteRecord('specimens', specimenRecordID),
    query: queryParams => queryCollection('specimens', queryParams), 
  }
  
  const users = {
    get: userID => getRecord('users', userID),
    set: (userID, data) => setRecord('users', userID, data),
    update: (userID, data) => updateRecord('users', userID, data),
    delete: userID => deleteRecord('users', userID),
    query: qryParams => queryCollection('users', qryParams), 
  }
  
  const userProjects = {
    get: userID => getRecord('userProjects', userID),
    set: (userID, data) => setRecord('userProjects', userID, data),
    delete: userID => deleteRecord('userProjects', userID),
    //no query, we don't need to query these...
    addProject: (userID, list, projectID) => arrayAppend('userProjects', userID, list, projectID),
    removeProject: (userID, list, projectID) => arrayRemove('userProjects', userID, list, projectID)
  }

  return {
    projects,
    projectBatches,
    projectParticipants,
    specimenImages,
    specimens,
    users,
    userProjects
  }
  
}