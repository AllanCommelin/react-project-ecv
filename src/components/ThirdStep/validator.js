const requiredFields = ['city', 'address']

const validateFields = (name, value) => {
  if (requiredFields.includes(name) && value.length === 0) {
    return 'Ce champ est requis'
  }

  return ''
}

export default validateFields;
