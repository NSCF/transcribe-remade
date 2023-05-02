import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'

import firebaseConfig from '../../nscfscriber-2e6b5fb26bb5.json' assert {type: 'json'}
import { randomUUID } from 'crypto'

initializeApp({
  credential: cert(firebaseConfig)
});

const db = getFirestore();


await db.collection('specimens').add({
  projectID: '135324534',
  barcode: 'PRU2454235',
  imageID: randomUUID()
})

console.log('all done')