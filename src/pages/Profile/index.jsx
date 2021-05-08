import Auth from '../../hoc/auth'
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/users";
import Input from "../../components/Input";
import {useState} from "react";

const Profile = () => {
    const user = useSelector(getCurrentUser)
    const [toUpdate, setToUpdate] = useState(false)
    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        email: '',
        image: '',
    })

    const handleChangeField = ({ target: { name, value } }) => setFields({ ...fields, [name]: value })

    const editUser = () => (
        <>
            <Input label="Prénom" id="firstName" name="firstName" value={fields.firstName} handleChange={handleChangeField} />
            <Input label="Nom" id="lastName" name="lastName" value={fields.lastName} handleChange={handleChangeField}  />
            <Input label="Date de naissance" type="date" id="birthday" name="birthday" value={fields.birthday} handleChange={handleChangeField}  />
            <Input label="Email" id="email" name="email" value={fields.email} handleChange={handleChangeField}  />
            <Input label="Photo de profil (url)" type="url" id="image" name="image" value={fields.image} handleChange={handleChangeField}  />
        </>
    )

    const showUser = () => (
        <>
            <div className="p-4">
                <span>{user.firstName}</span>
            </div>
            <div className="p-4">
                <span>{user.lastName}</span>
            </div>
            <div className="p-4">
                <span>{user.birthday}</span>
            </div>
            <div className="p-4">
                <span>{user.email}</span>
            </div>
            <div className="p-4">
                <span>{user.image}</span>
            </div>
        </>
    )

    const btnAction = () => {
        if(toUpdate) {
            // Save user infos
        }
        setToUpdate(!toUpdate)
    }

    return (
    <div className="w-3/4 mx-auto my-8">
        <h1 className="font-black text-2xl text-custom-darker-color">
            Bonjour
            <span className="text-custom-main-color">&nbsp;{user.firstName}</span> !
        </h1>
        <div className="p-8 rounded-md shadow-lg">
            <button className="p-2 border-2 border-custom-main-color text-custom-main-color" onClick={() => btnAction()}>{ toUpdate ? 'Enregistrer' : 'Modifier' }</button>
            { toUpdate ? editUser() : showUser() }
        </div>
    </div>
)}

export default Auth(Profile);