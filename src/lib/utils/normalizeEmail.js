export const normalizeEmail = function(emailString) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if(emailRegex.test(emailString)) {
    const parts = emailString.split('@')
    parts[0] = parts[0].replace(/\./g, '')
    emailString = parts.join('@')
    return emailString.toLowerCase()
  }
  else {
    throw new Error('invalid email')
  }
}