import PropTypes from 'prop-types';

const Textarea = ({ label, name, id, placeholder, cols, row, required, handleChange, value, error }) => (
  <div className="flex flex-col mt-10">
    <label 
    className="block text-sm font-medium text-gray-700"
    htmlFor={name}
    >{
    label}
    </label>
    <textarea 
      className="rounded-md mt-1 border p-2 border-gray-400"
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