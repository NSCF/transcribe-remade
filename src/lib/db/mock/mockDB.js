//every collection is a dictionary of key:object entries to mimic firestore

import { compileMongoQuery } from 'mongo-query-compiler'
import { makeID } from '../../utils/makeID.js'
import projects from "./collectionDataFiles/projects.json" assert {type: 'json'} 
import projectBatches from "./collectionDataFiles/projectBatches.json" assert {type: 'json'}
import projectParticipants from "./collectionDataFiles/projectParticipants.json" assert {type: 'json'}
import userProjects from "./collectionDataFiles/userProjects.json" assert {type: 'json'}
import users from "./collectionDataFiles/users.json" assert {type: 'json'}


const mockDB = {
  projects,
  projectBatches,
  projectParticipants,
  userProjects,
  users
}

Array.prototype.query = function(mongoQry) {

  if (mongoQry == null || Object.keys(mongoQry).length == 0) {
    return this
  }

  if  (typeof mongoQry != 'object' || Array.isArray(mongoQry)) {
    throw new Error('query selector must be an object or null')
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

    if(collectionName == null) {
      reject(new Error('collectionName cannot be null'))
    }
 
    if(recordID == null) {
      reject(new Error('recordID cannot be null'))
    }

    if (collectionName in mockDB) {
      const collection = mockDB[collectionName]
      if (recordID in collection) {
        resolve(collection[recordID])
      }
      else {
        reject(new Error(`record ${recordID} does not exist in ${collectionName}`))
      }
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}

function addRecord(collectionName, data) {
  return new Promise((resolve, reject) => {

    if(collectionName == null) {
      reject(new Error('collectionName cannot be null'))
    }
    
    if (typeof data != 'object' || Array.isArray(data)) {
      reject(new Error('data must be of type object'))
    }

    if (collectionName in mockDB) {
      const collection = mockDB[collectionName]
      const recordID = makeID()
      collection[recordID] = data
      resolve(recordID)
    }
    else { //it's an object
      reject(new Error('cannot add to collection ' + collectionName + ', use set()'))
    }

  })
}

function setRecord(collectionName, recordID, data) {
  return new Promise((resolve, reject) => {

    if(collectionName == null) {
      reject(new Error('collectionName cannot be null'))
    }
 
    if(recordID == null) {
      reject(new Error('recordID cannot be null'))
    }

    if (typeof data != 'object' || Array.isArray(data)) {
      reject(new Error('data must be of type object'))
    }

    if (collectionName in mockDB) {
      const collection = mockDB[collectionName]
      if(recordID in collection) {
        reject(new Error('record already exists, cannot overwrite'))
      }
      else {
        collection[recordID] = data
        resolve()
      }
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}

function updateRecord(collectionName, recordID, data) {
  return new Promise((resolve, reject) => {

    if(collectionName == null) {
      reject(new Error('collectionName cannot be null'))
    }
 
    if(recordID == null) {
      reject(new Error('recordID cannot be null'))
    }

    if (typeof data != 'object' || Array.isArray(data)) {
      reject(new Error('data must be of type object'))
    }

    if (collectionName in mockDB) {
      const collection = mockDB[collectionName]
      if(recordID in collection) {
        Object.apply(collection[recordID], data)
        resolve()
      }
      else {
        reject(new Error(`record ${recordID} does not exist in ${collectionName}`))
      }
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}

function deleteRecord(collectionName, recordID) {
  return new Promise((resolve, reject) => {

    if(collectionName == null) {
      reject(new Error('collectionName cannot be null'))
    }
 
    if(recordID == null) {
      reject(new Error('recordID cannot be null'))
    }

    if (collectionName in mockDB) {
      const collection = mockDB[collectionName]
      if (recordID in collection) {
        delete collection[recordID]
        resolve()
      }
      else {
        reject(new Error(`record ${recordID} does not exist in ${collectionName}`))
      }
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}

function arrayAppend(collectionName, recordID, arrayName, appendValue){
  return new Promise((resolve, reject) => {

    if(collectionName == null) {
      reject(new Error('collectionName cannot be null'))
    }
 
    if(recordID == null) {
      reject(new Error('recordID cannot be null'))
    }

    if(arrayName == null) {
      reject(new Error('arrayName cannot be null'))
    }

    if (typeof appendValue == 'object') {
      reject(new Error('value must be a simple data type (number, string, boolean)'))
    }

    if (collectionName in mockDB) {
      const collection = mockDB[collectionName]
      if (recordID in collection) {
        const record = collection[recordID]
        if (arrayName in record && Array.isArray(record[arrayName])){
          const arr = record[arrayName]
          if(!arr.includes(appendValue)){ //note that arrays need to be unique values
            collection[arrayName].push(appendValue)
          }
          resolve()
        }
        else {
          reject(new Error('Array ' + arrayName + ' does not exist in this record' ))
        }
      }
      else {
        reject(new Error(`record ${recordID} does not exist in ${collectionName}`))
      }
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}

function arrayRemove(collectionName, recordID, arrayName, removeValue){
  return new Promise((resolve, reject) => {

    if(collectionName == null) {
      reject(new Error('collectionName cannot be null'))
    }
 
    if(recordID == null) {
      reject(new Error('recordID cannot be null'))
    }

    if(arrayName == null) {
      reject(new Error('arrayName cannot be null'))
    }

    if (typeof remove == 'object' ) {
      reject(new Error('value must be a simple data type (string, number, boolean)'))
    }

    if (collectionName in mockDB) {
      const collection = mockDB[collectionName]
      if (recordID in collection) {
        const record = collection[recordID]
        if (arrayName in record && Array.isArray(record[arrayName])){
          const index = collection[arrayName].indexOf(removeValue)
          if (index >= 0) {
            record[arrayName].splice(index, 0)
          }
          resolve()
        }
        else {
          reject(new Error('Array ' + arrayName + ' does not exist in record'))
        }
      }
      else {
        reject(new Error(`record ${recordID} does not exist in ${collectionName}`))
      }
    }
    else {
      reject(new Error('collection ' + collectionName + ' does not exist'))
    }
  })
}

function queryCollection(collectionName, queryParams){
  return new Promise((resolve, reject) => {

    if(collectionName == null) {
      reject(new Error('collectionName cannot be null'))
    }

    if (queryParams != null && (typeof queryParams != 'object' || Array.isArray(queryParams))) {
      reject(new Error(`queryParams must be an object or null`))
    }

    if (collectionName in mockDB) {
      const collection = mockDB[collectionName]
      
      let searchArray = Object.values(collection)

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

const dbFuncs = {
  getRecord, 
  addRecord, 
  setRecord, 
  updateRecord,
  deleteRecord,
  arrayAppend,
  arrayRemove,
  queryCollection
}

export default dbFuncs





