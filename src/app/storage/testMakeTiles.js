import fs from 'fs/promises'
import path from 'path'

const fileDir =  String.raw`H:\Herbarium imaging\PRU\examples\TIFF`
const outDir = String.raw`C:\devprojects\transcribe-remake\static\images`

const files = await fs.readdir(fileDir)