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
import { removeArticleById } from '../../store/articles'

const Articles = () => {
  const itemPerPage = 3
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const term =
    location.search !== null && location.search.length > 0
      ? new URLSearchParams(location.search).get('term')
      : null
  const user = useSelector(getCurrentUser)
  const [articles, setArticles] = useState([])
  const [pageCount, setPageCount] = useState(0)

  const [displayPopup, setDisplayPopup] = useState(false)
  const [articleIdToRemove, setArticleIdToRemove] = useState(false)

  const [fields, setFields] = useState({
    term: term !== null && term.length > 0 ? term : '',
  })

  useEffect(() => {
    if (!articles.length) {
      let url = `${process.env.REACT_APP_API_URL}articles?_page=1&_limit=${itemPerPage}`

      if (term !== null && term.length > 0) {
        url = `${process.env.REACT_APP_API_URL}articles?title_like=${term}&_page=1&_limit=${itemPerPage}`
      }

      try {
        fetch(url, {
          method: 'GET',
        })
          .then((response) => {
            const links = response.headers.get('Link').split(',')
            const lastPageIndex = links[links.length - 1]
              .split(';')[0]
              .split('_page=')[1]
              .slice(0, 1)
            setPageCount(lastPageIndex)

            return response.json()
          })
          .then((data) => setArticles(data))
      } catch (e) {
        console.error(e)
      }
    }
  })

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

  const handlePageClick = async (e) => {
    const page = e.selected + 1

    let url = `${process.env.REACT_APP_API_URL}articles?_page=${page}&_limit=${itemPerPage}`

    if (term !== null && term.length > 0) {
      url = `${process.env.REACT_APP_API_URL}articles?title_like=${term}&_page=${page}&_limit=${itemPerPage}`
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
      })
      const data = await response.json()
      setArticles(data)
    } catch (e) {
      console.error(e)
    }
  }

  const submitForm = async (event) => {
    event.preventDefault()

    const term = event.target.querySelector('input[name="term"]').value
    let url = `${process.env.REACT_APP_API_URL}articles?_page=1&_limit=${itemPerPage}`

    if (term !== null && term.length > 0) {
      url = `${process.env.REACT_APP_API_URL}articles?title_like=${term}&_page=1&_limit=${itemPerPage}`
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
      })
      const data = await response.json()
      setArticles(data)
    } catch (e) {
      console.error(e)
    }
  }

  const Pagination = () => {
    if (articles.length >= itemPerPage) {
      return (
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageCount={pageCount}
        />
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

        {Pagination()}
      </div>
    </>
  )
}

export default Auth(Articles)
