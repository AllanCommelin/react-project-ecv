import PropTypes from 'prop-types'

const Popup = ({ children, onClose }) => (
  <div
    className="fixed top-0 left-0 h-screen w-screen bg-gray-500 bg-opacity-90 flex justify-center items-center"
    onClick={onClose}
  >
    <div
      className="relative flex flex-col h-1/2 w-1/2 p-5 bg-white rounded"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-5 right-5 cursor uppercase text-sm text-white rounded py-2 px-5 bg-red-700"
        onClick={onClose}
      >
        close
      </button>
      <div className="mt-5 flex flex-col flex-grow justify-center">{children}</div>
    </div>
  </div>
)

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Popup
