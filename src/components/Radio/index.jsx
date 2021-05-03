import { Fragment } from 'react'
import PropTypes from 'prop-types'

const Radio = ({ label, name, values, handleChange }) => (
  <div className="mt-5">
    <p>{label}</p>
    <div>
      {values.map(({ id, value, labelRadio }) => (
        <Fragment key={value}>
          <input type="radio" onChange={handleChange} name={name} id={id} value={value}/>
          <label className="mr-8" htmlFor={id} >{labelRadio}</label>
        </Fragment>
      ))}
    </div>
  </div>
);

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      labelRadio: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  )
}

export default Radio;