import { getArticles, retrieveArticlesForHome } from '../../store/articles'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import ArticlePreview from '../../components/ArticlePreview'
import Auth from '../../hoc/auth'
import {useHistory} from "react-router-dom";
import {getCurrentUser} from "../../store/users";

const Home = () => {
  const articles = useSelector(getArticles)
  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch()
  const history = useHistory()
  const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    if (!articles.length || !isFetched) {
      dispatch(retrieveArticlesForHome())
      setIsFetched(true)
    }
  }, [articles.length, isFetched, dispatch])

  return (
    <>
      <h1 className="text-center py-10 font-bold text-4xl">Bienvenue sur <br/><span className="font-black text-custom-main-color">eProducts</span></h1>
      <div className="container mx-auto grid grid-cols-3 gap-4 mb-10">
        {articles.slice(-3).map((article, index) => (
          <ArticlePreview key={index} article={article} />
        ))}
      </div>
      {user && <div className="flex justify-center items-center">
        <button className="mx-2 py-2 px-4 text-xl hover:border-custom-main-color text-custom-main-color underline" onClick={() => history.push('/articles')}>
          Voir plus d'articles
        </button>
      </div>}
    </>
  )
}

export default Auth(Home)
