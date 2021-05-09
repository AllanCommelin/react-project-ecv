import PropTypes from 'prop-types'

const Input = ({ type, label, name, placeholder, step, minlength, maxlength, required, handleChange, value, error, className }) => (
  <div className="flex flex-col mt-10">
    <label className="block text-sm font-medium text-gray-700" htmlFor={name}>{label}</label>
    <input
    className={"rounded-md mt-1 border p-2 border-gray-400 " + className}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      min={minlength}
      max={maxlength}
      required={required}
      onChange={handleChange}
      value={value}
      step={step}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
)

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  maxlength: PropTypes.string,
  minlength: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  step: PropTypes.string,
  className: PropTypes.string
}

Input.defaultProps = {
  type: 'text',
  maxlength: '100',
  minlength: '0',
  required: false,
  placeholder: '',
  error: '',
  step: '1',
  className: '',
}

export default Input;
