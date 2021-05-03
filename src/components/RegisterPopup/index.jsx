import PropTypes from 'prop-types'
import { useState } from 'react'
import FirstStep from '../FirstStep'
import SecondStep from '../SecondStep'
import ThirdStep from '../ThirdStep'
import FinalStep from '../FinalStep'
import Popup from '../Popup'

const RegisterPopup = ({ onClose }) => {
  const [step, setStep] = useState(1)
  const [fields, setFields] = useState({
    lastName: '',
    firstName: '',
    age: '0',
    email: '',
    sport: 'cyclisme',
    address: '',
    city: '',
    countries: 'AF',
  })

  const previousStep = () => {
    setStep(step - 1)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const handleChangeField = (name, value) => setFields({
    ...fields,
    [name]: value
  })

  const submitForm = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}users`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(fields)
      })
      setStep(step + 1)
    } catch(e) {
      throw e;
    }
  }

  return (
    <Popup onClose={onClose}>
      <form>
        {step === 1 && <FirstStep onNextStep={nextStep} fields={fields} onChangeField={handleChangeField} />}
        {step === 2 && <SecondStep onNextStep={nextStep} fields={fields} onPreviousStep={previousStep} onChangeField={handleChangeField} />}
        {step === 3 && <ThirdStep onNextStep={submitForm} fields={fields} onPreviousStep={previousStep} onChangeField={handleChangeField} />}
        {step === 4 && <FinalStep closePopup={onClose} />}
      </form>
    </Popup>
  )
}

RegisterPopup.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default RegisterPopup;