import Button from '../../components/Button'
import Auth from '../../hoc/auth'
import { useHistory } from 'react-router-dom'

const Articles = () => {
    const history = useHistory()
    
    return (
    <>
        <h1>Articles</h1>
        <Button type="submit" text="Créer un article" handleClick={() => history.push('/article/create')} />
    </>
)}

export default Auth(Articles);