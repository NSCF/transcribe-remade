import fs from 'fs/promises'
import path from 'path'
import sharp from "sharp"

const fileDir =  String.raw`H:\Herbarium imaging\PRU\examples\TIFF`
const outDir = String.raw`C:\devprojects\transcribe-remake\static\images`

const files = await fs.readdir(fileDir)

for (const file of files) {
  
  const outFile = file.replace(/\.tif$/i, '.dz')
  
  await sharp(path.join(fileDir, file))
  .jpeg()
  .tile({
    size: 512
  })
  .toFile(path.join(outDir, outFile), function(err, info) {
    // output.dzi is the Deep Zoom XML definition
    // output_files contains 256x256 tiles grouped by zoom level

    if(err) {
      console.error("There was error transforming", file)
      return
    }
    else {
      console.log('successfully transformed', file)
      console.log(info)
    }

  });
}

