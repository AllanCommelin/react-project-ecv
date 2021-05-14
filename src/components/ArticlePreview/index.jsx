import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const ArticlePreview = ({ article, displayPopup }) => {
  const history = useHistory()

  const displayConfirmationPopup = (e) => {
    e.stopPropagation()
    displayPopup(article.id)
  }

  return (
    <div
      className="flex flex-col p-4 border-2 shadow-md rounded-md cursor-pointer"
      onClick={() => history.push(`/articles/${article.id}`)}
    >
      <span
        data-user-id={article.user_id}
        className="text-lg uppercase text-center text-bold mb-4 py-2 px-4 bg-gray-400 text-white inline-block self-center"
      >
        {article.title}
      </span>
      <img className="object-cover h-56 w-full rounded flex-grow" src={article.image} alt="" />
      <p className="text-base my-3">{article.description}</p>
      <p className="text-base">
        Prix
        <span className="text-base text-bold py-1 px-2 ml-2 bg-gray-300 rounded">
          {article.price}€
        </span>
      </p>
      {displayPopup && (
        <button
          className="uppercase text-base bg-red-700 text-white rounded p-2 mt-5"
          onClick={displayConfirmationPopup}
        >
          Delete
        </button>
      )}
    </div>
  )
}

ArticlePreview.propTypes = {
  displayPopup: PropTypes.func,
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
}

ArticlePreview.defaultProps = {
  displayPopup: null,
}

export default ArticlePreview
