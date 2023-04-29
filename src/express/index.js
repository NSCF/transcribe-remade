import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import busboy from 'busboy';
import sharp from 'sharp';
const app = express()
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url))

//TODO use unzipper to try and unzip and save the results. 
//But how do we deal with directories in the zip file?


// Add a basic route to check if server's up
app.get('/', (req, res) => {
  res.status(200).send(`Server up and running`);
});

//stream a file to disk
app.post('/', (req, res) => {
  console.log('starting to process request')
  const bb = busboy({ headers: req.headers })

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;

    const filebasename = filename.replace(/\.[^/.]+$/, "")
    const newName = filebasename + '.zip'
    const newFilePath = path.resolve(__dirname, '../../images/', newName)
    console.log('new file path:', newFilePath)

    const writeStream = fs.createWriteStream(newFilePath)
    writeStream.on('finish', _ => console.log('done writing file...'))

    const tiler = sharp().tile({basename: filebasename, size: 512}) //default is dz

    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );

    file.pipe(tiler).pipe(writeStream)

  });

  bb.on('field', (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
  });

  bb.on('close', () => {
    console.log('Done parsing form!');
    res.redirect('back');
  });

  req.pipe(bb);

});

// Mount the app to a port
app.listen(port, () => {
  console.log('Server running at http://127.0.0.1:3000/');
}); 