import { customAlphabet } from 'nanoid'

/**
 * @type {Function}
 * @returns An identifier 10 chars in length
 */
export const makeID = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)
