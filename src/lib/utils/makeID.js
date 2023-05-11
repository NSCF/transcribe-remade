import { customAlphabet } from 'nanoid'

/**
 * @type {Function}
 * @returns An identifier 10 chars in length
 */
export const makeID = size => {
  if(size) {

    if(isNaN(size)) {
      throw new Error('invalid number provided to makeID')
    }

    if(size > 0) {
      return customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', size)()
    }
    else {
      throw new Error('invalid number provided to makeID')
    }
  }
  else {
    return customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)()
  }

}
