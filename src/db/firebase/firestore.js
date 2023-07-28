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

//TODO PRIORITY change user collection name to users from userProfiles
//TODO PRIORITY make all the functions the same as currently in mock

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
  const collection = getCollectionRef(collectionName)
  try {
    const newDocRef = await addDoc(collectionRef, data)
    return newDocRef.id
  }
  catch(err) {
    throw err
  }
}

//rule: we can't overwrite records...
async function setRecord(collectionName, recordID, data){
  const ref = getDocRef(collectionName, recordID)
  try {
    const docSnap =  await getDoc(ref) 
    if (docSnap.exists()) {
      throw new Error('record already exists, cannot overwrite')
    }
    else {
      await setDoc(ref, data) 
      return
    }
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
    return
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
    return
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
