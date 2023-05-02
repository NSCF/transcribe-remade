import path from 'path';
import { Buffer } from 'buffer';
import { fileURLToPath } from 'url';
import express from 'express';
import busboy from 'busboy';
import sharp from 'sharp';
import yauzl from 'yauzl'
import { Storage } from '@google-cloud/storage';

const app = express()
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const storage = new Storage({ keyFilename: './nscfscriber-2e6b5fb26bb5.json' });
const bucketName = 'scriberimages';


// Add a basic route to check if server's up
app.get('/', (req, res) => {
  res.status(200).send(`Server up and running`);
});

//recieve a file, tile it, store it
//note this expects one file only and responds as soon as that file is read
//just make sure in the client that we have a projectid field in the form and that it has a value
app.post('/imageupload', (req, res) => {
  console.log('starting to process request')
  const bb = busboy({ headers: req.headers })

  let imageID = null

  bb.on('field', (name, val, info) => {
    if(name == 'image-id') {
      imageID = val
    }
  });

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;

    // read yauzl docs for why we need a buffer...
    const bufferBits = []
    const tiler = sharp().tile({basename: imageID, size: 512}) //default is dz
    tiler.on('data', data => bufferBits.push(data))
    tiler.on('error', err => console.error('error tiling image:', err.message))
    tiler.on('end', _ => {
      console.log('finished buffering image tiles')
      const buffer = Buffer.concat(bufferBits)

      yauzl.fromBuffer(buffer, {lazyEntries: true}, (err, zip) => {
        if (err) {
          console.error('error reading zip data:', err.message)
        }
        else {
          zip.on("entry", function(entry) {
            if (/\/$/.test(entry.fileName)) {
              // This doesn't actually seem to do anything here...
              // Directory file names end with '/'.
              // Note that entries for directories themselves are optional.
              // An entry's fileName implicitly requires its parent directories to exist.
              console.log('directory:', entry.fileName)
              zip.readEntry();
            } else {
              // file entry
              const storageFileName = entry.fileName.split('/').slice(1).join('/')
          
              const storageFile = storage.bucket(bucketName).file(storageFileName)
              const writeStream = storageFile.createWriteStream()
              writeStream.on('error', err => {
                console.error('error storing file:', err.message)
              })
              // writeStream.on('finish', _ => {
              //   console.log('finished writing', entry.fileName)
              // })

              zip.openReadStream(entry, function(err, readStream) {
                if (err) throw err;
                readStream.on("end", function() {
                  zip.readEntry();
                });
                readStream.pipe(writeStream);
              });
            }
          })

          zip.readEntry();

        }
      })
    })

    //respond as soon as we have the file...
    //of course that means no reponse to the client if there is a problem later...
    file.on('end', _ => {
      res.end('this is the end of the upload, but there\'s still more...')
    })

    file.pipe(tiler)

  });

  req.pipe(bb);

});

// Mount the app to a port
app.listen(port, () => {
  console.log('Server running at http://127.0.0.1:3000/');
}); 