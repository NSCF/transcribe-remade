import app from './firebaseapp.js'
import { queryParamsToFirestore } from './mongoToFirestore.js';

import { 
  getFirestore, 
  collection, 
  doc,
  getDoc, 
  addDoc,
  setDoc, 
  updateDoc,
  deleteDoc,
  query, 
  where,
  or,
  getDocs, 
  arrayUnion, 
  arrayRemove as fbArrayRemove
} from "firebase/firestore";

const firestore = getFirestore(app)

function getDocRef(collectionName, recordID){
  return doc(firestore, collectionName, recordID)
}

function getCollectionRef(collectionName){
  return collection(firestore, collectionName)
}

async function getRecord(collectionName, recordID){
  const ref = getDocRef(collectionName, recordID)
  try {
    const docSnap =  await getDoc(ref) 
    if (docSnap.exists()) {
      return docSnap.data()
    }
    else {
      return null
    }
  }
  catch(err) {
    throw err
  }
}

async function addRecord(collectionName, data){
  try {
    const docRef =  await addDoc(collection(firestore, collectionName), data) 
    return docRef
  }
  catch(err) {
    throw err
  }
}

async function setRecord(collectionName, recordID, data){
  const ref = getDocRef(collectionName, recordID)
  try {
    await setDoc(ref, data) 
    return
  }
  catch(err) {
    throw err
  }
}

async function updateRecord(collectionName, recordID, data){
  const ref = getDocRef(collectionName, recordID)
  try {
    await updateDoc(ref, data) 
    return
  }
  catch(err) {
    throw err
  }
}

async function deleteRecord(collectionName, recordID){
  const ref = getDocRef(collectionName, recordID)
  try {
    await deleteDoc(ref) 
    return
  }
  catch(err) {
    throw err
  }
}

async function arrayAppend(collectionName, recordID, arrayName, appendValue) {
  const ref = getDocRef(collectionName, recordID)
  try {
    await updateDoc(ref, {
      [arrayName]: arrayUnion(appendValue)
    })
  }
  catch(err) {
    throw err
  }
}

async function arrayRemove(collectionName, recordID, arrayName, removeValue) {
  const ref = getDocRef(collectionName, recordID)
  try {
    await updateDoc(ref, {
      [arrayName]: fbArrayRemove(removeValue)
    })
  }
  catch(err) {
    throw err
  }
}

async function queryCollection(collectionName, queryParams) {
  const collectionRef = getCollectionRef(collectionName)
  //TODO convert queryparams to a array of firebase where functions
  const fireBaseQueryParams = queryParamsToFirestore(where, or, queryParams)
  const q = query(collectionRef, ...fireBaseQueryParams)
  const qrySnapshot = await getDocs(q)
  const records = qrySnapshot.docs.map(docSnap => {
    const record = docSnap.data()
    record.firebaseID = docSnap.id
    return record
  })

  return records
}

const projects = {
  get: projectID => getRecord('projects', projectID),
  set: (projectID, data) => setRecord('projects', projectID, data),
  update: (projectID, data) => updateRecord('projects', projectID, data),
  delete: projectID => deleteRecord('projects', projectID),
  query: queryParams => queryCollection('projects', queryParams), 
}

const projectBatches = {
  update: (projectBatchID, data) => updateRecord('projectBatches', projectBatchID, data),
  delete: projectBatchID => deleteRecord('projectBatches', projectBatchID),
  query: _ => queryCollection('projectBatches', queryParams)
}

//this is one to one so we use the projectID as the ID field
const projectParticipants = {
  get: projectID => getRecord('projectParticipants', projectID),
  set: (projectID, data) => setRecord('projectParticipants', projectID, data),
  delete: projectID => deleteRecord('projectParticipants', projectID),
  query: queryParams => queryCollection('projectParticipants', queryParams), 
  /**
   * @param {string} projectID 
   * @param {('invitedUsers'|'currentParticipants'|'declinedParticipants'|'previousParticipants')} participantList The list to add the user to
   * @param {*} userID The user ID to add to the list
   * @returns 
   */
  arrayAppend: (projectID, participantList, userID) => arrayAppend('projectParticipants', projectID, participantList, userID),
  /**
   * @param {string} projectID 
   * @param {('invitedUsers'|'currentParticipants'|'declinedParticipants'|'previousParticipants')} participantList The list to remove the user from
   * @param {*} userID The user to remove
   * @returns 
   */
  arrayRemove: (projectID, participantList, userID) => arrayRemove('projectParticipants', projectID, participantList, userID)
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

const userProfiles = {
  get: userID => getRecord('userProfiles', userID),
  set: (userID, data) => setRecord('userProfiles', userID, data),
  update: (userID, data) => updateRecord('userProfiles', userID, data),
  delete: userID => deleteRecord('userProfiles', userID),
  query: qryParams => queryCollection('userProfiles', qryParams), 
}

const userProjects = {
  get: userID => getRecord('userProjects', userID),
  set: (userID, data) => setRecord('userProjects', userID, data),
  delete: userID => deleteRecord('userProjects', userID),
  //no query, we don't need to query these...
  arrayAppend: (userID, arrayName, newValue) => arrayAppend('userProjects', userID, arrayName, newValue),
  arrayRemove: (userID, arrayName, valueToRemove) => arrayRemove('userProjects', userID, arrayName, valueToRemove)
}


//this works
const out = {
  projects,
  projectBatches,
  projectParticipants,
  specimenImages,
  specimens,
  userProfiles,
  userProjects
}

export default out
