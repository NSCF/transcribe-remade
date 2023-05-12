//This is just for testing/demonstration of how this works...

import { compileMongoQuery } from 'mongo-query-compiler'

Array.prototype.query = function(mongoQry) {
  if (!mongoQry) {
    throw new Error('mongo qry must be provided')
  }
  try {
    const qryFunction = compileMongoQuery(mongoQry)
    return this.filter(qryFunction)
  }
  catch(err) {
    throw err
  }
}

//the firestore example, for testing...
const cities = [
  {
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] },
  {
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] },
  {
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] },
  {
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] },
  {
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] }
]

const mongoQry = {
  $or: [ 
    {
      $and: [
        {country: 'USA'},
        {
          population: {
            $lt: 1000000
          }
        }
    ]
    },
    {name: 'Beijing'}
  ]
}

// let filtered = cities.query(mongoQry)
// let i = 0



