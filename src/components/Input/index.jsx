import PropTypes from 'prop-types'

const Input = ({ type, label, name, placeholder, step, minlength, maxlength, required, handleChange, value, error }) => (
  <div className="flex flex-col mt-10">
    <label htmlFor={name}>{label}</label>
    <input
    className="border p-1"
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
  step: PropTypes.string
}

Input.defaultProps = {
  type: 'text',
  maxlength: '100',
  minlength: '0',
  required: false,
  placeholder: '',
  error: '',
  step: '1'
}

export default Input;
