import PropTypes from 'prop-types'
import RegisterButton from '../RegisterButton'
import check from '../../static/img/check.png'

const FinalStep = ({ closePopup }) => (
  <div className="flex flex-col justify-center">
    <img src={check} alt="check" className="w-20 h-20 mt-20 mx-auto"/>
    <h1 className="text-center my-10 text-xl">Vous vous êtes bien enregistré !</h1>
    <RegisterButton className="mt-20" text="Fermer la pop-up" handleClick={closePopup} />
  </div>
)

FinalStep.propTypes = {
  closePopup: PropTypes.func.isRequired
}

export default FinalStep;
