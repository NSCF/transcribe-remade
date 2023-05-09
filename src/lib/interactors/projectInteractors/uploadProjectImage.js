//this breaks the dependency rule a bit because here we shouldn't know about File, fetch or FormData (the internet is an IO device...)

/**
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