const makeGetUserProjects = db => {
  /**
   * @param {string} userID The ID of the user we are fetching projects for
   * @param {('accepted'|'invited')} projectType The type of projects to retrieve
   */
  return async function getUserProjects(userID, projectType) {
 
    if(!projectType) {
      throw new Error('projectType must be supplied')
    }

    let userProjectIDs
    try {
      userProjectIDs = await db.userProjects.get(userID)
    }
    catch(err) {
      throw err
    }

    let userProjects = []
    const searchProjectIDs = userProjectIDs[projectType + 'Projects']
    if (searchProjectIDs.length) { //only go to the database if we need to
      try {
        userProjects = await db.projects.query({
          projectID: {
            $in: searchProjectIDs
          }
        })
      }
      catch(err){
        throw err
      }
    }

    return userProjects

  }
}

export default makeGetUserProjects

