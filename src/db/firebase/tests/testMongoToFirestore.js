//TODO test with real examples
import { queryParamsToFirestore } from "../mongoToFirestore.js"

let exa = {
  name: 'John',
  city: 'Kansas',
  $or: [
    {lastName: 'Smith'},
    {
      age: {
        $gte: 50
      }
    }
  ]
}

function query(params) {
  return params
}

const q = query('collectionRef', 
  where('name', '==', 'John'), 
  where('city', '==', 'Kansas'),
  or(
    where('lastName', '==', 'Smith'),
    where('age', '>=', 50)
  ))

let ex1 = { name: 'John' }

//with operators:

let ex2 = { 
  count: {
    $gte: 10
  }
}

//remember IN operator also...

let ex3 = {
  $and: [{ name: 'John' }, {city: 'Salt Lake City'}]
}

//should be the same as above
let ex3a = {
  name: 'John',
  city: 'Salt Lake City'
}

let ex4 = {
  $or: [{ name: 'John' }, {name: 'Mike'}]
}

let ex5 = { 
  name: 'John',
  $or: [{city: 'Salt Lake City'}, {city: 'New York'}]
}

let examples = [exa, ex1, ex2, ex3a, ex4, ex5]

function where(...rest) {
  return rest
}

function or(...rest) {
  return rest
}

for (const ex of examples) {
  let result
  try {
    result = queryParamsToFirestore(where, or, ex)
    let i = 1
  }
  catch(err) {
    console.log('error converting', Object.keys({ex})[0])
    console.log(err.message)
  }
}