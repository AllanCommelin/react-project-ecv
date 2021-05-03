import PropTypes from 'prop-types';

const Button = ({ handleClick, text, type }) => (
  <button type={type} className="py-2 px-5 my-1 text-white bg-gray-400 shadow-sm rounded" onClick={() => handleClick(text)}>{text}</button>
)

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired
}

Button.defaultProps = {
  handleClick: () => {},
  type: 'button',
}

export default Button;
