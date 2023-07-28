export default function(timestamp){
  
  try{
    const d = new Date(timestamp)
    return d.toISOString().split('T')[0]
  }
  catch(err) {
    throw err
  }
  
}