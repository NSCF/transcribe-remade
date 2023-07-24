  const userPresenter = {

    firstName: null,
    lastName: null,
    affiliation: null,
    affiliationAbbreviation: null,
    email: null,
    emailConf: null,
    password: null,
    passwordConf: null,

    clear: function() {
      this.firstName = null
      this.lastName = null
      this.affiliation = null
      this.affiliationAbbreviation = null
      this.email = null
      this.emailConf = null
      this.password = null
      this.passwordConf = null
      console.log(this)
    }
  }

  export default userPresenter