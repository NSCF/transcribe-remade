import makeDB from "./makeDB.js";
import firestore from './firebase/firestore.js'
import mock from './mock/mockDB.js'

let db

if (import.meta?.env?.PROD) {
  db = makeDB(firestore)
}
else { //dev mode
  db = makeDB(mock)
}

export default db