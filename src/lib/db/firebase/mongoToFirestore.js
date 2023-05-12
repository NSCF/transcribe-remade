export const comparisonOperators = {
  $eq: '==',
  $gt: '>',
  $gte: '>=',
  $lt: '<',
  $lte: '<=',
  $ne: '!=',
  // mongo array operators
  $in: 'in',
  $nin: 'not-in',
  //these are not mongo operators...
  //here we need an array on the left (the field we are querying), and either...
  $has: 'array-contains', //...one value on the right
  $any: 'array-contains-any' //... an array of values on the right
}

//these operators require an array on the right...
export const arrayComparisonOperators = ['$in', '$nin', '$any']

//TODO we need $not
export const logicalOperators = ['$and', '$or'] //these are the only ones that firestore uses

export const isComparisonOperator = function(op) {
  return Object.keys(comparisonOperators).includes(op)
}

export const isLogicalOperator = function(op) {
  return logicalOperators.includes(op)
}

export const isValidOperator = function(op) {
  return isComparisonOperator(op) || isLogicalOperator(op)
}


const parseFieldValue = function(field, value, where) {
  if(Array.isArray(value)){
    throw new Error('invalid query object structure: array must have operator')
  }
  if (typeof value == 'object'){ 
    //there should only be one key, and it should be an operator
    let operator = Object.keys(value)[0]
    value = Object.values(value)[0] //reassignment - shoh...
    if(operator in comparisonOperators) {
      if(arrayComparisonOperators.includes(operator)){
        if(!Array.isArray(value) || value.length == 0) {
          throw new Error('array comparison operator requires array value')
        }
      } //implicit else
      return where(field, comparisonOperators[operator], value)
    }
    else {
      throw new Error('invalid comparison operator supplied')
    }
  }
  else if (typeof value == 'string' && value.trim().length > 0) { //simplest case...
    return where(field, '==', value.trim())
  }
}

const parseLogicalOperatorValue = function(operator, value, or, where){
  //value has to be an array
  if(!Array.isArray(value)) {
    throw new Error('invalid value provided for logical operator: must be an array')
  }

  //and all the items must be objects (and not arrays)
  if (!value.every(item => typeof item == 'object' && !Array.isArray(item))) {
    throw new Error('all array items provided to logical operator must be objects')
  }

  const clauses = []
  for (const item of value) {
    const field = Object.keys(item)[0] //there should only be one...
    const value = Object.values(item)[0] //ditto
    try {
      const clause = parseFieldValue(field, value, where)
      clauses.push(clause)
    }
    catch(err) {
      throw err
    }
  }

  if (operator == '$or') {
    return or(...clauses)
  }
  else {
    return clauses
  }
  
}


//utility for converting mongo style query parameters (objects) to firestore style queries
export const queryParamsToFirestore = function(where, or, queryParams){
  if (!where || !or){
    throw new Error('where/or Firestore functions are required')
  }

  if (typeof queryParams != 'object'){
    throw new Error('queryParams must a mongo style query object')
  }

  let queryClauses = []

  //handle case where we don't have queryParams
  if (queryParams == null) {
    queryParams = {}
  }

  for (const [key, val] of Object.entries(queryParams)){
    if (key.startsWith('$')) { //it's an operator...
      if(key in arrayComparisonOperators) { //it should not be, we need a field!
        throw new Error('cannot start queryParams with a comparison operator')
      }

      if(!logicalOperators.includes(key)) {
        throw new Error('invalid logical operator supplied')
      }

      //else
      let logicalOperatorClauses
      try {
        logicalOperatorClauses = parseLogicalOperatorValue(key, val, or, where) 
      }
      catch(err) {
        throw err
      }

      if(Array.isArray(logicalOperatorClauses)) {
        queryClauses = [...queryClauses, ...logicalOperatorClauses]
      }
      else {
        queryClauses.push(logicalOperatorClauses)
      }
    }
    else { //it's a field name
      try {
        queryClauses.push(parseFieldValue(key, val, where))
      }
      catch(err) {
        throw err
      }
    }
  }

  return queryClauses

}

//examples

