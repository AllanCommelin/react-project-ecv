import PropTypes from 'prop-types';

const Textarea = ({ label, name, id, placeholder, cols, row, required, handleChange, value, error }) => (
  <div className="flex flex-col mt-10">
    <label htmlFor={name}>{label}</label>
    <textarea 
      className="border p-1"
      name={name}
      id={id}
      required={required}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
)

Textarea.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool
}

Textarea.defaultProps = {
  type: 'text',
  required: false,
  placeholder: '',
  error: ''
}

export default Textarea;