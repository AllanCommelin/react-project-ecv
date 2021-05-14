import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom';
import { getCurrentUser, resetUser } from '../../store/users'

const Header = () => {
  const user = useSelector(getCurrentUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const logout = () => {
    dispatch(resetUser())
    Cookies.remove('jwt')
    history.push('/login')
  }
  const btnClass = (route) => {
      let btn = 'mx-2 py-2 px-4 '
      btn += location.pathname === route ? 'text-custom-main-color' : 'text-white hover:text-custom-main-color';
      return btn
  }
  return (
    <header className="w-full h-20 px-5 flex items-end justify-between items-center bg-custom-darker-color">
      <div className="flex items-center">
        <h3 className="font-black text-custom-light-color text-2xl" onClick={() => history.push('/')}>
            eProducts
        </h3>
      </div>
      <div className="flex items-center">
        <button className={btnClass('/')} onClick={() => history.push('/')}>
          Accueil
        </button>
        {user === null ? (
            <>
                <button className="mx-2 py-2 px-4 border-white hover:border-custom-main-color border-2 rounded text-white hover:text-custom-main-color"
                        onClick={() => history.push('/login')}>
                    Se connecter
                </button>
                <button className="mx-2 py-2 px-4 border-white hover:border-custom-main-color border-2 rounded text-white hover:text-custom-main-color"
                        onClick={() => history.push('/register')}>
                    Inscription
                </button>
            </>
        ) : (
            <>
              <button className={btnClass('/articles')}
                      onClick={() => history.push('/articles')}>
                Articles
              </button>
              <button className={btnClass('/profile')}
                      onClick={() => history.push('/profile')}>
                  <div className="flex items-center">
                      <img className="w-8 h-8 rounded-full object-cover mr-4" src={user.image} alt='profil'/>
                      <span>Mon profil</span>
                  </div>
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
