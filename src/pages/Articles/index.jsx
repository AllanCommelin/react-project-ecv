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
import { getCurrentUser } from '../../store/users'
import { useHistory } from 'react-router'

const Articles = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)
  const articles = useSelector(getArticles)

  const [displayPopup, setDisplayPopup] = useState(false)
  const [articleIdToRemove, setArticleIdToRemove] = useState(false)

  const [fields, setFields] = useState({
    term: '',
  })

  useEffect(() => {
    if (!articles.length) {
      dispatch(retrieveArticles())
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

  const submitForm = async (event) => {
    event.preventDefault()

    const term = event.target.querySelector('input[name="term"]').value

    if (term !== null && term.length > 0) {
      dispatch(retrieveArticlesByTitle(term))
    } else {
      dispatch(retrieveArticles())
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
      </div>
    </>
  )
}

export default Auth(Articles)
