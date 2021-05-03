import PropTypes from 'prop-types'

const Popup = ({ children, onClose }) => (
  <div className="absolute h-screen w-screen bg-gray-500 flex justify-center items-center" onClick={onClose}>
    <div className="relative h-1/2 w-1/2 p-5 bg-white rounded" onClick={e => e.stopPropagation()}>
      <button className="absolute top-5 right-5 cursor" onClick={onClose}>x</button>
      <div className="mt-5">
        {children}
      </div>
    </div>
  </div>
)

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Popup;
