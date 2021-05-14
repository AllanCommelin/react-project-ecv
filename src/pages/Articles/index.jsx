import {
  getArticles,
  removeArticleById,
  retrieveArticles,
  retrieveArticlesByTitle,
} from '../../store/articles'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import ArticlePreview from '../../components/ArticlePreview'
import Auth from '../../hoc/auth'
import Button from '../../components/Button'
import ConfirmationPopup from '../../components/ConfirmationPopup'
import Input from '../../components/Input'
import ReactPaginate from 'react-paginate'
import { getCurrentUser } from '../../store/users'
import { useHistory } from 'react-router'

const Articles = () => {
  const limit = 3
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)
  const articles = useSelector(getArticles)

  const [displayPopup, setDisplayPopup] = useState(false)
  const [articleIdToRemove, setArticleIdToRemove] = useState(false)
  const [activePage, setActivePage] = useState(0)
  const [isFetched, setIsFetched] = useState(false)

  const [fields, setFields] = useState({
    term: '',
  })

  useEffect(() => {
    if (!articles.length || !isFetched) {
      dispatch(retrieveArticles())
      setIsFetched(true)
    }
  }, [articles.length, isFetched, dispatch])

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

  const submitForm = async (event) => {
    event.preventDefault()

    const term = event.target.querySelector('input[name="term"]').value
    setActivePage(0)

    if (term !== null && term.length > 0) {
      dispatch(retrieveArticlesByTitle(term))
    } else {
      dispatch(retrieveArticles())
    }
  }

  const handlePageChange = (e) => {
    setActivePage(e.selected)
  }

  const articlesList = () => {
    return articles
      .slice(activePage * limit, activePage * limit + 3)
      .map((article, index) => (
        <ArticlePreview
          key={index}
          article={article}
          displayPopup={
            user !== null && article.user_id === user.id ? displayConfirmationPopup : null
          }
        />
      ))
  }

  const Pagination = () => {
    const pageCount = Math.round(articles.length / 3)

    if (pageCount > 1) {
      return (
        <div className="flex justify-center">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={'flex justify-center divide-x p-2 mt-8 border-2 rounded'}
            pageClassName={'py-2 px-3 flex items-center'}
            previousClassName={'py-2 px-3 flex items-center'}
            nextClassName={'py-2 px-3 flex items-center'}
            disabledClassName={'opacity-60'}
            activeClassName={'text-bold text-blue-700'}
          />
        </div>
      )
    }
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

        <div className="grid grid-cols-3 gap-4">{articlesList()}</div>

        {Pagination()}
      </div>
    </>
  )
}

export default Auth(Articles)
