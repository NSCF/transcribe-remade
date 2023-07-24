import {describe, it, expect} from 'vitest'
import db from '../mockDB'

describe('project dataset', async _ => {
  let projects = await db.queryCollection('projects', null)
  
  it('should be an array', _ => {
    expect(projects).toBeInstanceOf(Array)
  })

  it('should have five records', _ => {
    expect(projects.length).toBe(5)
  })
  
})

