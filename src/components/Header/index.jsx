import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { getCurrentUser, resetUser } from '../../store/users'

const Header = () => {
  const user = useSelector(getCurrentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(resetUser())
    Cookies.remove('jwt')
    history.push('/login')
  }

  return (
    <header className="w-full h-20 px-5 flex items-end justify-between items-center bg-custom-darker-color">
      <div>
        <h3 className="font-black text-custom-light-color text-2xl" onClick={() => history.push('/')}>
            eProducts
        </h3>
      </div>
      <div>
        <button className="mx-2 py-2 px-4 text-white hover:text-custom-main-color" onClick={() => history.push('/')}>
          Accueil
        </button>
        {user === null ? (
            <button className="mx-2 py-2 px-4 border-white hover:border-custom-main-color border-2 rounded text-white hover:text-custom-main-color"
                    onClick={() => history.push('/login')}>
              Se connecter
            </button>
        ) : (
            <>
              <button className="mx-2 py-2 px-4 rounded text-white hover:text-custom-main-color"
                      onClick={() => history.push('/articles')}>
                Articles
              </button>
              <button className="mx-2 py-2 px-4 rounded text-white hover:text-custom-main-color"
                      onClick={() => history.push('/profile')}>
                Mon profil
              </button>
              <button className="mx-2 py-2 px-4 border-white hover:border-custom-main-color border-2 rounded text-white hover:text-custom-main-color"
                      onClick={logout}>
                Deconnexion
              </button>
            </>
        )}
      </div>
    </header>
  )
}

export default Header;
