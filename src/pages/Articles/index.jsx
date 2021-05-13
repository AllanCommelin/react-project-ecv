import {
  getArticles,
  removeArticleById,
  retrieveArticles,
  retrieveArticlesWithFilters,
} from '../../store/articles'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'

import ArticlePreview from '../../components/ArticlePreview'
import Auth from '../../hoc/auth'
import Button from '../../components/Button'
import ConfirmationPopup from '../../components/ConfirmationPopup'
import Input from '../../components/Input'
import ReactPaginate from 'react-paginate'
import { getCurrentUser } from '../../store/users'

const Articles = () => {
  const itemPerPage = 3
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const search = new URLSearchParams(location.search)
  const term = location.search !== null && location.search.length > 0 ? search.get('term') : null
  const user = useSelector(getCurrentUser)
  const articles = useSelector(getArticles)

  const [displayPopup, setDisplayPopup] = useState(false)
  const [articleIdToRemove, setArticleIdToRemove] = useState(false)
  const [page, setPage] = useState(1)

  const [fields, setFields] = useState({
    term: term !== null && term.length > 0 ? term : '',
  })

  useEffect(() => {
    if (term !== null && term.length > 0 && !articles.length) {
      setPage(1)
      dispatch(
        retrieveArticlesWithFilters({
          types: ['title_like', '_page', '_limit'],
          values: [term, page, itemPerPage],
        })
      )
    } else if (!articles.length) {
      search.delete('term')
      setPage(1)
      dispatch(
        retrieveArticlesWithFilters({ types: ['_page', '_limit'], values: [page, itemPerPage] })
      )
    }
  }, [term, articles.length, dispatch, page, search])

  setPage(parseInt(page) + 1)

  const removeArticle = () => {
    dispatch(removeArticleById(articleIdToRemove))
    setArticleIdToRemove()
    setDisplayPopup(false)
  }

  const displayConfirmationPopup = (articleId) => {
    setArticleIdToRemove(articleId)
    setDisplayPopup(true)
  }

  const handleChangeField = ({ target: { name, value } }) => setFields({ ...fields, [name]: value })

  const handlePageClick = () => {
    let types = ['_page', '_limit']
    let values = [page, itemPerPage]

    if (term !== null && term.length > 0) {
      types = ['title_like', ...types]
      values = [term, ...values]
    }

    dispatch(retrieveArticlesWithFilters({ types, values }))
  }

  const submitForm = (event) => {
    event.preventDefault()

    const term = event.target.querySelector('input[name="term"]').value

    if (term !== null && term.length > 0) {
      dispatch(retrieveArticlesWithFilters({ types: ['title_like'], values: [term] }))
      history.push(`/articles?term=${term}`)
    } else {
      dispatch(retrieveArticles())
      history.push('/articles')
    }

    setPage(parseInt(page) + 1)
  }

  return (
    <>
      {displayPopup && (
        <ConfirmationPopup onClose={() => setDisplayPopup(false)} confirmed={removeArticle} />
      )}

      <h1 className="text-center py-10 font-bold text-2xl">Articles</h1>

      <div className="container mx-auto flex flex-col mb-10">
        <div className="flex space-around mb-5">
          <form onSubmit={submitForm} className="w-1/3 m-auto flex items-end">
            <Input
              label="Rechercher"
              className="mb-1"
              id="term"
              name="term"
              value={fields.term}
              handleChange={handleChangeField}
            />
            <Button className="ml-2" type="submit" text="Rechercher" />
          </form>

          <button
            className="bg-green-500 rounded px-5 py-2 mb-5 self-end"
            onClick={() => history.push('/article/create')}
          >
            Ajouter un article
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {articles.map((article, index) => (
            <ArticlePreview
              key={index}
              article={article}
              displayPopup={
                user !== null && article.user_id === user.id ? displayConfirmationPopup : null
              }
            />
          ))}
        </div>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </>
  )
}

export default Auth(Articles)
