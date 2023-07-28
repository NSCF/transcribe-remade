import { signUpUser as signUpUserUseCase } from "$use-cases/users";

const controller = {
  async signUpUser(newUserViewModel) {
    //double check all is good
    if (newUserViewModel.emailIsValid() 
    && newUserViewModel.passwordIsValid() 
    && newUserViewModel.emailsMatch()
    && newUserViewModel.passwordsMatch()) {
      const userData = {
        firstName: newUserViewModel.firstName,
        lastName: newUserViewModel.lastName,
        affiliation: newUserViewModel.affiliation,
        affiliationAbbreviation: newUserViewModel.affiliationAbbreviation,
        email: newUserViewModel.email,
        password: newUserViewModel.password
      }

      try {
        let userProfile = await signUpUserUseCase(userData)
        return userProfile
      }
      catch(err) {
        throw err
      }
    }
    else {
      throw new Error('invalid user data')
    }
  }
}

export default controller