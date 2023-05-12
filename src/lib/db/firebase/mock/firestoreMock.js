import { compileMongoQuery } from 'mongo-query-compiler'
import projectBatchesRecords from "./projectBatches.js"
import projectParticipantsRecords from "./projectParticipants.js"
import projectsRecords from "./projects.js"
import userProjectsRecords from "./userProjects"
import usersRecords from "./users.js"


const dbRecords = {
  projectBatchesRecords,
  projectParticipantsRecords,
  projectsRecords,
  userProjectsRecords,
  usersRecords
}

Array.prototype.query = function(mongoQry) {
  if (!mongoQry) {
    throw new Error('mongo qry must be provided')
  }
  try {
    const qryFunction = compileMongoQuery(mongoQry)
    return this.filter(qryFunction)
  }
  catch(err) {
    throw err
  }
}


function getRecord(collectionName, recordID) {
  return new Promise((resolve, reject) => {
    if (collectionName in dbRecords) {
      const collection = dbRecords[collectionName]
      if(Array.isArray(collection)) {
        try {
          const record = projectsRecords.filter(x => x.projectID == projectID)[0]
          resolve(record)
        }
        catch { //only the index can throw here
          resolve(null)
        }
      }
      else { //it must be an object
        if (recordID in collection) {
          resolve(collection[recordID]) 
        }
        else {
          resolve(null)
        }
      }
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}

function setRecord(collectionName, recordID, data) {
  return new Promise((resolve, reject) => {
    if (collectionName in dbRecords) {
      getRecord(collectionName, recordID)
      .then(record => {
        if (record == null) {
          const collection = dbRecords[collectionName]
          if (Array.isArray(collection)) {
            collection.push(data)
          }
          else { //its an object
            collection[recordID] = data
          }
          resolve()
        }
        else {
          reject(new Error('record already exists, cannot overwrite'))
        }
      })
      .catch(err => {
        reject(err)
      })
      
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}

function updateRecord(collectionName, recordID, data) {
  return new Promise((resolve, reject) => {
    if (collectionName in dbRecords) {
      getRecord(collectionName, recordID).then(record => {
        if (record) {
          Object.assign(project, data)
          resolve()
        }
        else {
          reject(new Error('record does not exist'))
        }
      })
      .catch(err => {
        reject(err)
      })
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}


function deleteRecord(collectionName, recordID) {
  return new Promise((resolve, reject) => {
    if (collectionName in dbRecords) {
      getRecord(collectionName, recordID).then(record => {
        if (record) {
          const collection = dbRecords[collectionName]
          if (Array.isArray(collection)) {
            const index = collection.indexOf(record)
            collection.splice(index, 1)
          }
          else { //it's an object
            delete collection[recordID]
          }
          resolve()
        }
        else {
          reject(new Error('record does not exist'))
        }
      })
      .catch(err => {
        reject(err)
      })
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}

function arrayAppend(collectionName, recordID, arrayName, appendValue){
  return new Promise((resolve, reject) => {
    if (collectionName in dbRecords) {
      const collection = dbRecords[collectionName]
      if (arrayName in collection && Array.isArray(collection[arrayName])){
        collection[arrayName].push(appendValue)
        resolve()
      }
      else {
        reject(new Error('Array ' + arrayName + ' does not exist in collection ' + collectionName))
      }
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}

function arrayRemove(collectionName, recordID, arrayName, removeValue){
  return new Promise((resolve, reject) => {
    if (collectionName in dbRecords) {
      const collection = dbRecords[collectionName]
      if (arrayName in collection && Array.isArray(collection[arrayName])){
        const index = collection[arrayName].indexOf(removeValue)
        if (index >= 0) {
          collection[arrayName].splice(index, 0)
        }
        resolve()
      }
      else {
        reject(new Error('Array ' + arrayName + ' does not exist in collection ' + collectionName))
      }
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}

function queryCollection(collectionName, queryParams){
  return new Promise((resolve, reject) => {
    if (collectionName in dbRecords) {
      const collection = dbRecords[collectionName]
      let searchArray
      if(Array.isArray(collection)) {
        searchArray = collection
      }
      else { //it's an object
        searchArray = Object.values(collection)
      }

      try {
        const results = searchArray.query(queryParams)
        resolve(results)
      }
      catch(err) {
        reject(err)
      }
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}



const projects = {
  get: projectID => getRecord('projectsRecords', projectID),
  set: (projectID, data) => setRecord('projectsRecords', projectID, data),
  update: (projectID, data) => {
    return new Promise((resolve, reject) => {
      
    })
  },
  delete: projectID => {
    return new Promise((resolve, reject) => {
      const index = projectsRecords.indexOf(x => x.projectID == projectID)
      if (index >= 0) {
        projectsRecords.splice(index,1)
        resolve()
      }
      else {
        reject()
      }
    })
  }, 
  query: queryParams => {
    return new Promise((resolve, reject) => {
      try {
        const results = projectsRecords.query(queryParams)
        resolve(results)
      }
      catch(err){
        reject(err)
      }
    })
  }

}