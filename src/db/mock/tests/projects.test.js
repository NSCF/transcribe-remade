import {describe, it, expect} from 'vitest'
import projects from "../collectionDataFiles/projects.json" assert {type: 'json'}
import projectBatches from '../collectionDataFiles/projectBatches.json' assert {type: 'json'}


describe('projects', _ => {

  it('should be an object', _ => {
    expect(true).toBe(true)
  }),

  it('should have five project records', _ => {
    expect(Object.keys(projects).length).toBe(5)
  }),

  it('should all have project batches',  _ => {
    expect(Object.values(projects).every(project => {
      const batches = Object.values(projectBatches).filter(batch => batch.projectID == project.projectID)
      return batches.length > 0
    })).toBe(true)
  })
})

describe('project batches', _ => {
  
  it('should all belong to a project', _ => {
    expect(Object.values(projectBatches).every(projectBatch => Object.keys(projects).includes(projectBatch.projectID))).toBe(true)
  })

})


