//recieve a file from upload, tile it, and return the zipped buffer
import sharp from "sharp"

export const makeTiles = (fileBuffer) => {
  
}



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

