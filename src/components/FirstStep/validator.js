const requiredFields = ['firstName', 'lastName', 'age']

const validateFields =  (name, value) => {
  if (requiredFields.includes(name) && value.length === 0) {
    return 'Ce champ est requis'
  }

  if (name === 'age' && value <= 18) {
    return 'Vous devez etre majeur pour vous inscrire'
  }

  return ''
}

export default validateFields;
