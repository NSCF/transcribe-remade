//this breaks the dependency rule a bit because here we shouldn't know about File, fetch or FormData (the internet is an IO device...)

/**
 * Note the server does the database work for each image
 * @param {string} projectID 
 * @param {File} file 
 */
const uploadProjectImage = async (projectID, file) => {
  let fd = new FormData()
  fd.append('projectID', projectID)
  fd.append('file', file)

  const response = await fetch('imageupload', {
    method: 'POST',
    body: fd
  })

  if(response.ok){
    return
  }
  else {
    throw new Error(await response.text())
  }
}

export default uploadProjectImage