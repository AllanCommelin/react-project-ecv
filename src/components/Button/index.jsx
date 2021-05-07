import PropTypes from 'prop-types';

const Button = ({ handleClick, text, type, className }) => (
  <button type={type} className={"py-2 px-5 my-1 text-white bg-blue-400 shadow-sm rounded " + className} onClick={() => handleClick(text)}>{text}</button>
)

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Button.defaultProps = {
  handleClick: () => {},
  type: 'button',
  className: '',
}

export default Button;
