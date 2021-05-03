import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import RegisterButton from '../RegisterButton'
import Input from '../Input'
import Select from '../Select'
import validateFields from './validator'
import checkAllErrors from '../../utils/error'

const ThirdStep = ({ onNextStep, onPreviousStep, fields, onChangeField }) => {

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.eu/rest/v2/all')
        const body = await response.json()
        
        const countriesSerialize = body.map(({ name, alpha2Code }) => ({ label: name, value: alpha2Code }))
        setCountries(countriesSerialize)

      } catch(e) {
        throw e;
      }
    }
    fetchCountries()
  }, [])

  const [countries, setCountries] = useState([])

  const [errors, setErrors] = useState({
    address: '',
    city: '',
  })

  const handleChangeField = ({ target: { name, value } }) => {
    onChangeField(name, value)
    const error = validateFields(name, value)
    setErrors({
      ...errors,
      [name]: error
    })
  }

  const nextStep = async e => {
    e.preventDefault()
    const hasErrors = checkAllErrors(errors, validateFields, fields, setErrors)
    if (!hasErrors) {
      onNextStep()
    }
  }

  return (
    <>
      <Input label="Adresse" id="address" name="address" value={fields.address} handleChange={handleChangeField} error={errors.address} />
      <Input label="Ville" id="city" name="city" value={fields.city} handleChange={handleChangeField} error={errors.city} />
      {countries && <Select label="Pays" options={countries} id="countries" name="countries" handleChange={handleChangeField} value={fields.countries} />}
      <div className="w-full flex justify-between mt-5">
        <RegisterButton text="Previous" handleClick={onPreviousStep} />
        <RegisterButton type="submit" text="Next" handleClick={nextStep} />
      </div>
    </>
  )
}

ThirdStep.propTypes = {
  onNextStep: PropTypes.func.isRequired,
  onPreviousStep: PropTypes.func.isRequired,
}

export default ThirdStep;
