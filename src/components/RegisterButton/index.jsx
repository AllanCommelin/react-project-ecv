import PropTypes from 'prop-types'

const RegisterButton = ({ text, handleClick, type }) => (
  <button type={type} className="py-2 px-5 border-2 border-blue-400 rounded hover:bg-blue-400 hover:text-white" onClick={handleClick}>{text}</button>
)

RegisterButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

RegisterButton.defaultProps = {
  type: 'button'
}

export default RegisterButton;