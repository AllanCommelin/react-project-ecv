import { Fragment } from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ label, values, handleChange }) => (
  <div className="mt-5">
    <p>{label}</p>
    {values.map(({ labelCheckbox, name, id, isChecked }) => (
      <Fragment key={name}>
        <label htmlFor={id}>{labelCheckbox}</label>
        <input type="checkbox" name={name} id={id} onChange={handleChange} className="mr-2" value={id} checked={isChecked}/>
      </Fragment>
    ))}
  </div>
)

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      labelCheckbox: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isChecked: PropTypes.bool.isRequired,
    })
  )
}

export default Checkbox;
