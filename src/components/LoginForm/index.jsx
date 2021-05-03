import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken';
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import { addProfile } from '../../store/users'
import Input from '../Input'
import Button from '../Button'

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [fields, setFields] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState()

  const handleChangeField = ({ target: { name, value } }) => setFields({ ...fields, [name]: value })

  const submitForm = async e => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}users?username=${fields.username}&password=${fields.password}`, {
        method: 'GET',
      })
      const data = await response.json()
      if (data.length) {
        const token = jwt.sign(data[0], 'secret');
        Cookies.set('jwt', token)
        
        const payload = jwt.decode(Cookies.get('jwt'))
        delete payload.iat
        dispatch(addProfile(payload))
        history.push('/posts')
      } else {
        setError("Email ou/et mot de passe incorrect")
      }
    } catch(e){
      throw e;
    }
  }

  return (
    <>
      <h1 className="text-center py-10 font-bold text-2xl">Connexion</h1>
      <form onSubmit={submitForm} className="w-1/3 m-auto border rounded p-5">
        <Input label="Identifiant" id="username" name="username" value={fields.username} handleChange={handleChangeField}  />
        <Input label="Mot de passe" id="password" type="password" name="password" value={fields.password} handleChange={handleChangeField}  />
        {error && <p className="text-red-900">{error}</p>}
        <Button type="submit" text="Se connecter" />
        <p className="text-center"><Link to="/register">Pas encore de compte ?</Link></p>
      </form>
    </>
  )
}

export default LoginForm;