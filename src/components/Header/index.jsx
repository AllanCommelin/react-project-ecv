import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { getCurrentUser, resetProfile } from '../../store/users'

const Header = () => {
  const user = useSelector(getCurrentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(resetProfile())
    Cookies.remove('jwt')
    history.push('/login')
  }

  return (
    <header className="w-full h-20 px-5 flex flex-col items-end justify-center bg-gray-600">
      {user === null ? (
        <button 
          className="py-2 px-4 border-white border-2 rounded text-white"
          onClick={() => history.push('/login')}
        >Se connecter</button>
        ) : (
        <button 
        className="py-2 px-4 border-white border-2 rounded text-white"  
        onClick={logout}>
          Deconnexion
        </button>
      )}
    </header>
  )
}

export default Header;
