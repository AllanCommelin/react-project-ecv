import { getArticles, retrieveArticlesForHome } from '../../store/articles'
import { useDispatch, useSelector } from 'react-redux'

import ArticlePreview from '../../components/ArticlePreview'
import Auth from '../../hoc/auth'
import { useEffect } from 'react'

const Home = () => {
  const articles = useSelector(getArticles)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!articles.length) {
      dispatch(retrieveArticlesForHome())
    }
  })

  return (
    <>
      <h1 className="text-center py-10 font-bold text-2xl">Accueil</h1>
      <div className="container mx-auto grid grid-cols-3 gap-4 mb-10">
        {articles.slice(-3).map((article, index) => (
          <ArticlePreview key={index} article={article} />
        ))}
      </div>
    </>
  )
}

export default Auth(Home)
