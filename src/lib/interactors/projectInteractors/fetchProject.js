const fetchProject = (db, projectID) => {
  let project = await db.projects.get(projectID)
  let participants = await db.projectParticipants.get(projectID)
  project.participants = participants

  return project
}

export default fetchProject
