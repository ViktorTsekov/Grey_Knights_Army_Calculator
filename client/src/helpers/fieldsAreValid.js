module.exports = (...requiredFields) => {
  let fieldsAreValid = true

  requiredFields.forEach((el) => {
    if(el === "") {
      fieldsAreValid = false
    }
  })

  return fieldsAreValid
}
