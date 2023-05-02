import fs from 'fs'
import { Storage } from '@google-cloud/storage';

const storage = new Storage({ keyFilename: './nscfscriber-2e6b5fb26bb5.json' });

async function getBucketFiles(bucketName) {
  // Creates the new bucket
  let [files] = await storage.bucket(bucketName).getFiles();

  if(files.length > 0) {
    console.log('Files:');
    files.forEach(file => {
      console.log(file.name);
    });
  }
  else {
    console.log('no files in', bucketName)
  }

}

// The ID of your GCS bucket
const bucketName = 'scriberimages';

getBucketFiles(bucketName).catch(console.error);