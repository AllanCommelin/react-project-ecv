import PropTypes from 'prop-types'
import Button from '../Button'
import Popup from '../Popup'

const ConfirmationPopup = ({ onClose, confirmed }) => (
  <Popup onClose={onClose}>
      <h2 className="text-center text-2xl">Etes-vous sur de bien vouloir supprimer l'article ?</h2>
      <div className="flex space-between">
        <Button text="Oui" handleClick={confirmed} />
        <Button text="Non" handleClick={onClose} />
      </div>
  </Popup>
)

ConfirmationPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  confirmed: PropTypes.func.isRequired
}

export default ConfirmationPopup;