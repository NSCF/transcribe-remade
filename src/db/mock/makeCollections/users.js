import { faker } from '@faker-js/faker/locale/en_ZA';
import { makeID } from '../../../app/utils/makeID.js';
import normalizeEmail from '../../../app/utils/normalizeEmail.js';

/**
 * @type {Object<string, User>}
 */
const users = {}

while (Object.values(users).length < 20) {
  /**@type {User}*/
  const user = {
    userID: makeID(5),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    createdDate: faker.date.past().getTime()
  }

  user.email = faker.internet.email(user.firstName, user.lastName)
  user.searchEmail = normalizeEmail(user.email)

  users[user.userID] = user
}

export default users