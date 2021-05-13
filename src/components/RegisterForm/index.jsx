import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Button from '../Button';
import Input from '../Input';
import { registerUser } from '../../store/users'

const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState()
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    role: 'user',
    image: '',
    createdAt: Date.now(),
    password: ''
  })

  const handleChangeField = ({ target: { name, value } }) => setFields({ ...fields, [name]: value })

  const submitForm = async e => {
    e.preventDefault();
    setError(false)
    const checkRequired = Object.keys(fields).find(key => fields[key] === '')
    if (checkRequired) {
      setError('Veuillez remplir tous les champs')
      return;
    }

    const isOk = await dispatch(registerUser(fields))

    if (isOk) {
      history.push("/articles")
    } else {
      setError('Une erreur est survenue !')
    }
  }

  return (
    <>
      <h1 className="text-center py-10 font-bold text-2xl">Inscription</h1>
      <form onSubmit={submitForm} className="w-1/3 m-auto border rounded p-5">
        <Input label="Prénom" id="firstName" name="firstName" value={fields.firstName} handleChange={handleChangeField} />
        <Input label="Nom" id="lastName" name="lastName" value={fields.lastName} handleChange={handleChangeField}  />
        <Input label="Date de naissance" type="date" id="birthday" name="birthday" value={fields.birthday} handleChange={handleChangeField}  />
        <Input label="Email" id="email" name="email" value={fields.email} handleChange={handleChangeField}  />
        <Input label="Photo de profil (url)" type="url" id="image" name="image" value={fields.image} handleChange={handleChangeField}  />
        <Input label="Mot de passe" id="password" type="password" name="password" value={fields.password} handleChange={handleChangeField}  />
        {error && <div className="p-4 my-4 rounded-md bg-red-100 border border-red-900"><p className="text-red-900">{error}</p></div>}
        <Button type="submit" text="Valider"/>
        <p className="text-center"><Link to="/register">Deja inscrit ?</Link></p>
      </form>
    </>
  )
}

export default RegisterForm;