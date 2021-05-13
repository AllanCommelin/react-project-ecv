import Button from '../../components/Button'
import Auth from '../../hoc/auth'
import { useHistory } from 'react-router-dom'
import { getArticles , retrieveArticles } from "../../store/articles";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Articles = () => {
    const history = useHistory()
    const dispatch = useDispatch()
   
    useEffect(() => {
        dispatch(retrieveArticles())
    }, [])

    const articles = useSelector(getArticles)

    const articlesLinks = articles.map(article => {
        return <Button text={article.title} handleClick={() => history.push(`/article/${article.id}`)} />
    })
    return (
    <>
        <h1>Articles</h1>
        <Button type="submit" text="Créer un article" handleClick={() => history.push('/article/create')} />
        <div>
           {articlesLinks} 
        </div>
    </>
)}

export default Auth(Articles);