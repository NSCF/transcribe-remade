import { faker } from '@faker-js/faker/locale/en_ZA';
import { makeID } from '../../../utils/makeID.js';
import normalizeEmail from '../../../utils/normalizeEmail.js';

/**
 * @type {User[]}
 */
const users = []

while (users.length < 20) {
  /**@type {User}*/
  const user = {
    userID: makeID(5),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    createdDate: faker.date.past().getTime()
  }

  user.email = faker.internet.email(user.firstName, user.lastName)
  user.searchEmail = normalizeEmail(user.email)

  users.push(user)
}

export default users