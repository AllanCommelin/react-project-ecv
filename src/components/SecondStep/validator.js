const validateFields =  (name, value) => {
  if (name === 'email' && value.length === 0) {
    return 'Ce champ est requis'
  }

  if (name === 'email' && !RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(value)) {
    return 'Veuillez inscrire une adresse mail correcte'
  }

  return ''
}

export default validateFields;
