import PropTypes from 'prop-types';

const Banner = ({ text, close }) => (
  <div className="w-full flex justify-between t-0 l-0 r-0 border-l-4 border-green-500 bg-green-300 px-10">
    <p>{text}</p>
    <button onClick={close}>x</button>
  </div>
)

Banner.propTypes = {
  text: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
}

export default Banner;