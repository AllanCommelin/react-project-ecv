import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../components/Header'
import { addUser, getCurrentUser } from '../store/users'

const pathsNotCheck = ['/login', '/register', '/'];

const Auth = Component => {
    const Layout = () => {
        const history = useHistory();
        const dispatch = useDispatch();
        const location = useLocation();
        const user = useSelector(getCurrentUser)

        useEffect(() => {
            if (!pathsNotCheck.includes(location.pathname)) {
                if (!Cookies.get('jwt')) {
                    history.push('/login')
                }
            }
            if (!user && Cookies.get('jwt')) {
                // We have to fetch user's information, with json-auth-server we juste have email info in jwt cookie
                const {sub} = jwt.decode(Cookies.get('jwt'))
                fetch(`${process.env.REACT_APP_API_URL}users/${sub}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('jwt')}`
                    }
                }).then( async (res) => {
                    const data =  await res.json();
                    delete data.password
                    if (res.status === 401) {
                        Cookies.remove('jwt')
                        return history.push('/login')
                    }
                
                    dispatch(addUser(data))
                })
            }
        }, [dispatch, history, location.pathname, user])

        return (
            <>
                <Header />
                <Component/>
            </>
        )
    }
    return Layout
}


export default Auth;
