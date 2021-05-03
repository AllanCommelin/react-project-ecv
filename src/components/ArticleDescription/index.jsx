import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import ArticlePreview from '../ArticlePreview'
import Button from '../Button'
import { getNextArticle, getPreviousArticle } from '../../store/articles'

const ArticleDescription = ({ article }) => {
  const history = useHistory();
  const nextArticle = useSelector(state => getNextArticle(state, article.id))
  const previousArticle = useSelector(state => getPreviousArticle(state, article.id))

  return (
    <div className="px-10">
      <h1 className="mb-10 text-center font-semibold text-4xl">{article.title}</h1>
      <Button text="articles" handleClick={() => history.push('/articles')} />
      <img className="w-full mb-10" src="https://picsum.photos/500/200" alt=""/>
      <p>{article.description}</p>
      <p>{article.price}</p>
      <div className="flex justify-between">
        {previousArticle && <ArticlePreview  article={previousArticle} />}
        {nextArticle && <ArticlePreview  article={nextArticle} />}
      </div>
    </div>
  );
}

ArticleDescription.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })
}

export default ArticleDescription;
