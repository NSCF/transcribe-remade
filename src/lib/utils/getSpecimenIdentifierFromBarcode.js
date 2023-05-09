export default function(barcode) {
  if(barcode && barcode.trim()){
    return barcode.replace(/[a-z]+^/i, '').split(/[-_]/)[0]
  }
  else {
    throw new Error('invalid barcode')
  }
}