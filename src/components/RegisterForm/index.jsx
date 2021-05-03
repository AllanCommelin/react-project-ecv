import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Button from '../Button';
import Input from '../Input';
import { createUser } from '../../store/users'

const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  })

  const handleChangeField = ({ target: { name, value } }) => setFields({ ...fields, [name]: value })

  const submitForm = async e => {
    e.preventDefault();

    const checkError = Object.keys(fields).find(field => field === '')

    if (checkError) {
      return;
    }

    dispatch(createUser(fields))
    history.push("/login")
  }

  return (
    <>
      <h1 className="text-center py-10 font-bold text-2xl">Inscription</h1>
      <form onSubmit={submitForm} className="w-1/3 m-auto border rounded p-5">
        <Input label="Prénom" id="firstName" name="firstName" value={fields.firstName} handleChange={handleChangeField} />
        <Input label="Nom" id="lastName" name="lastName" value={fields.lastName} handleChange={handleChangeField}  />
        <Input label="Identifiant" id="username" name="username" value={fields.username} handleChange={handleChangeField}  />
        <Input label="Mot de passe" id="password" type="password" name="password" value={fields.password} handleChange={handleChangeField}  />
        <Button type="submit" text="Valider"/>
        <p className="text-center"><Link to="/register">Deja inscrit ?</Link></p>
      </form>
    </>
  )
}

export default RegisterForm;