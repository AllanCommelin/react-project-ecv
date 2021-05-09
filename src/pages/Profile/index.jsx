import Auth from '../../hoc/auth'
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser, updateUser} from "../../store/users";
import { useHistory } from 'react-router-dom'
import Input from "../../components/Input";
import {useState} from "react";
import Button from "../../components/Button";
import Banner from "../../components/Banner";

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(getCurrentUser)
    if (!user) {
        history.push('/')
    }
    const [displayBanner, setDisplayBanner] = useState(false)
    const closeBanner = () => setDisplayBanner(false)
    const [error, setError] = useState()
    const [toUpdate, setToUpdate] = useState(false)
    const [fields, setFields] = useState({
        id: user ? user.id : '',
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        birthday: user ? user.birthday : '',
        email: user ? user.email : '',
        image: user ? user.image : '',
    })

    const handleChangeField = ({ target: { name, value } }) => setFields({ ...fields, [name]: value })

    const editUser = () => (
        <>
            <form id="editForm" onSubmit={submitForm}>
                <Input label="Prénom" id="firstName" name="firstName" value={fields.firstName} handleChange={handleChangeField} />
                <Input label="Nom" id="lastName" name="lastName" value={fields.lastName} handleChange={handleChangeField}  />
                <Input label="Date de naissance" type="date" id="birthday" name="birthday" value={fields.birthday} handleChange={handleChangeField}  />
                <Input label="Email" id="email" name="email" value={fields.email} handleChange={handleChangeField}  />
                <Input label="Photo de profil (url)" type="url" id="image" name="image" value={fields.image} handleChange={handleChangeField}  />
                {error && <div className="p-4 my-4 rounded-md bg-red-100 border border-red-900"><p className="text-red-900">{error}</p></div>}
                <Button type="submit" text="Enregistrer"/>
            </form>
        </>
    )

    const getAge = (date) => {
        const birthday = new Date(date)
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const showUser = () => (
        <>
            <div className="p-4">
                <fieldset className="border border-custom-main-color py-2 px-4 rounded-sm">
                    <legend className="bg-white text-custom-main-color px-2">Prénom</legend>
                    <span className="px-2 font-bold">{user.firstName}</span>
                </fieldset>
            </div>
            <div className="p-4">
                <fieldset className="border border-custom-main-color py-2 px-4 rounded-sm">
                    <legend className="bg-white text-custom-main-color px-2">Nom</legend>
                    <span className="px-2 font-bold">{user.lastName}</span>
                </fieldset>
            </div>
            <div className="p-4">
                <fieldset className="border border-custom-main-color py-2 px-4 rounded-sm">
                    <legend className="bg-white text-custom-main-color px-2">Âge</legend>
                    <span className="px-2 font-bold">{getAge(user.birthday)} ans</span>
                </fieldset>
            </div>
            <div className="p-4">
                <fieldset className="border border-custom-main-color py-2 px-4 rounded-sm">
                    <legend className="bg-white text-custom-main-color px-2">Email</legend>
                    <span className="px-2 font-bold">{user.email}</span>
                </fieldset>
            </div>
        </>
    )

    const btnAction = () => {
        if(toUpdate) {
            // Save user infos
            return document.querySelector('#editForm > button[type=submit]').click()
        }
        setToUpdate(!toUpdate)
    }

    const submitForm = async e => {
        e.preventDefault();
        setError(false)
        const checkRequired = Object.keys(fields).find(key => fields[key] === '')
        if (checkRequired) {
            setError('Veuillez remplir tous les champs')
            return;
        }

        const isOk = await dispatch(updateUser(fields))

        if (isOk) {
            setDisplayBanner(true)
            setTimeout(function () {
                setDisplayBanner(false)
            }, 3000)
            setToUpdate(!toUpdate)
        }
        else setError('Une erreur est survenue !')
    }

    return (
    <div className="w-3/4 mx-auto my-8">
        {displayBanner && <Banner text="L'utilisateur a été mise à jour avec succès" close={closeBanner} />}
        <div className="p-8 rounded-md shadow-lg">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <img className="w-16 h-16 rounded-full object-cover mr-4" src={user.image} alt='profil'/>
                    <h1 className="font-black text-2xl text-custom-darker-color">
                        Bonjour
                        <span className="text-custom-main-color">&nbsp;{user.firstName}</span> !
                    </h1>
                </div>
                <div>
                    <button className="p-2 rounded-sm bg-custom-dark-color border-2 border-custom-dark-color text-custom-light-color" onClick={() => btnAction()}>{ toUpdate ? 'Enregistrer' : 'Modifier' }</button>
                </div>
            </div>
            { toUpdate ? editUser() : showUser() }
        </div>
    </div>
)}

export default Auth(Profile);