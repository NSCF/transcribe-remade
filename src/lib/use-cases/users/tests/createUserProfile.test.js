import {describe, it, expect} from 'vitest'
import { createUserProfile } from '../'


describe('createUserProfile', _ => {
  it('fails with blank arguments', async _ => {
    await expect(createUserProfile()).rejects.toThrow()
  })

  it('works with the required parameters', async _ => {
    await expect(createUserProfile('asdfasdf', {firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com'}))
    .resolves
    .toBeTypeOf('object')

  })
}
)