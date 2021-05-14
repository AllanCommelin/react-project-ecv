import Button from '../Button'
import Popup from '../Popup'
import PropTypes from 'prop-types'

const ConfirmationPopup = ({ onClose, confirmed }) => (
  <Popup onClose={onClose}>
    <h2 className="text-center text-2xl mb-4">
      Etes-vous sur de bien vouloir supprimer l'article ?
    </h2>
    <div className="flex justify-center">
      <Button className="mr-4 uppercase" text="Oui" handleClick={confirmed} />
      <Button className="uppercase" text="Non" handleClick={onClose} />
    </div>
  </Popup>
)

ConfirmationPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  confirmed: PropTypes.func.isRequired,
}

export default ConfirmationPopup
