import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import { loginUser } from "../../store/users";
import Banner from "../Banner";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [displayBanner, setDisplayBanner] = useState(false)
  const [fields, setFields] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState()

  const handleChangeField = ({ target: { name, value } }) => setFields({ ...fields, [name]: value })

  const closeBanner = () => setDisplayBanner(false)

  const submitForm = async e => {
    e.preventDefault();
    setError(false)
    const checkRequired = Object.keys(fields).find(key => fields[key] === '')
    if (checkRequired) {
      setError('Veuillez remplir tous les champs')
      return;
    }
    const isOk = await dispatch(loginUser(fields))
    if (isOk) {
      setDisplayBanner(true)
      setFields({
        email: '',
        password: '',
      })
      setTimeout(function () {
        history.push('/articles')
      }, 1000)
    } else {
      setError('Email ou/et mot de passe incorrect')
    }
  }

  return (
    <>
      {displayBanner && <Banner text="Utilisateur connecté ! Vous allez être redirigé vers l'acceuil" close={closeBanner} />}
      <h1 className="text-center py-10 font-bold text-2xl">Connexion</h1>
      <form onSubmit={submitForm} className="w-1/3 m-auto border rounded p-5">
        <Input label="Email" id="email" name="email" value={fields.email} handleChange={handleChangeField}  />
        <Input label="Mot de passe" id="password" type="password" name="password" value={fields.password} handleChange={handleChangeField}  />
        {error && <div className="p-4 my-4 rounded-md bg-red-100 border border-red-900"><p className="text-red-900">{error}</p></div>}
        <Button type="submit" text="Se connecter" />
        <p className="text-center"><Link to="/register">Pas encore de compte ?</Link></p>
      </form>
    </>
  )
}

export default LoginForm;