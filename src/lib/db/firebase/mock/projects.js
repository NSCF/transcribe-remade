import { faker } from '@faker-js/faker/locale/en_ZA';
import { makeID } from '../../../utils/makeID.js';
import users from './users.js'

/**@type {import("../../../../types/Project").Project[]} */
const projects = []

const projectNames = [
  'PRE Senecio 2023', 
  'PRU QuickGuide 20230413', 
  'PRU vagrant monocots 20230510',
  'NU accesion May 2022',
  'NBG request 12Apr',
  'BOL Iridaceae 2022 Batch 1'
]

while (projects.length < 5) {
  const project = {
    projectID: makeID(),
    projectName: projectNames[projects.length],
    isCoreFieldsProject: faker.datatype.boolean(),
    notes: faker.lorem.sentence(5),
    isActive: faker.datatype.boolean(),
    createdBy: users[Math.floor(Math.random() * users.length)].userID, 
    createdDate: faker.date.past().getTime(),
    specimenCount: faker.datatype.number({min: 1000, max: 5000}),
    capturedRecordCount: 0,
    checkedRecordCount: 0,
    batchSize: Math.ceil(faker.datatype.number({min:20, max: 100}) / 10) * 10,
    isCompleted: false,
    completedBy: null,
    completedDate: null,
    participants: null
  }

  project.batchCount = Math.ceil(project.specimenCount / project.batchSize),

  projects.push(project)

}

export default projects

