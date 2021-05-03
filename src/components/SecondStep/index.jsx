import PropTypes from 'prop-types'
import { useState } from 'react'
import Input from '../Input'
import RegisterButton from '../RegisterButton'
import Select from '../Select'
import validateFields from './validator'
import checkAllErrors from '../../utils/error'

const sports =  [
  {
    label : 'Cyclisme',
    value: 'cyclisme'
  },
  {
    label : 'Football',
    value: 'football'
  },
  {
    label : 'Handball',
    value: 'handball'
  }
]

const SecondStep = ({ onNextStep, onPreviousStep, fields, onChangeField }) => {
  const [errors, setErrors] = useState({
    email: '',
    sport: ''
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
      <Input type="email" id="email" name="email" label="Email" handleChange={handleChangeField} error={errors.email} value={fields.email} />
      <Select options={sports} label="Hobbies" id="sport" name="sport" handleChange={handleChangeField} value={fields.sport} />
      <div className="w-full flex justify-between mt-5">
        <RegisterButton text="Previous" handleClick={onPreviousStep} />
        <RegisterButton text="Next" handleClick={nextStep} />
      </div>
    </>
  )
}

SecondStep.propTypes = {
  onNextStep: PropTypes.func.isRequired,
  onPreviousStep: PropTypes.func.isRequired,
}

export default SecondStep