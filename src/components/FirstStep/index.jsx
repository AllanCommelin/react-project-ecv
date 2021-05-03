import { useState } from 'react'
import RegisterButton from '../RegisterButton'
import Input from '../Input'
import validateFields from './validator'
import checkAllErrors from '../../utils/error'

const FirstStep = ({ onNextStep, fields, onChangeField }) => {
  const [errors, setErrors] = useState({
    lastName: '',
    firstName: '',
    age: ''
  })

  const handleChangeField = ({ target: { name, value } }) => {
    onChangeField(name, value)
    const error = validateFields(name, value)
    setErrors({
      ...errors,
      [name]: error
    })
  }

  const nextStep = () => {
    const hasErrors = checkAllErrors(errors, validateFields, fields, setErrors)
    if (!hasErrors) {
      onNextStep()
    }
  }

  return (
    <>
      <Input label="Prénom" id="firstName" name="firstName" value={fields.firstName} handleChange={handleChangeField} error={errors.firstName} />
      <Input label="Nom" id="lastName" name="lastName" value={fields.lastName} handleChange={handleChangeField} error={errors.lastName} />
      <Input label="Age" id="age" name="age" value={fields.age} handleChange={handleChangeField} error={errors.age} />
      <div className="w-full flex justify-end mt-5">
        <RegisterButton text="Next" handleClick={nextStep} />
      </div>
    </>
  )

}

export default FirstStep