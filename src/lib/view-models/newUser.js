const newUserViewModel = {

  firstName: null,
  lastName: null,
  affiliation: null,
  affiliationAbbreviation: null,
  email: null,
  emailConf: null,
  password: null,
  passwordConf: null,

  clear() {
    console.log('clearing user details')
    this.firstName = null
    this.lastName = null
    this.affiliation = null
    this.affiliationAbbreviation = null
    this.email = null
    this.emailConf = null
    this.password = null
    this.passwordConf = null
  },

  firstNameIsValid() {
    return this.firstName && this.firstName.trim() && this.firstName.trim().length >= 2
  },

  emailIsValid() {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email) 
  },

  passwordIsValid() {
    return this.password?.length >= 8 || false
  },

  emailsMatch() {
    return this.emailIsValid() && this.email == this.emailConf
  },

  passwordsMatch() {
    return this.passwordIsValid() && this.password == this.passwordConf
  }
  
}

export default newUserViewModel