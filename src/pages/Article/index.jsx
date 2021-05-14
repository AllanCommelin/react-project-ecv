import { getArticle, retrieveArticle, updateArticle } from '../../store/articles'
import { getCurrentUser } from '../../store/users'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Auth from '../../hoc/auth'
import Banner from '../../components/Banner'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import { useParams } from 'react-router-dom'

const Article = () => {
  const dispatch = useDispatch()

  let { id } = useParams()

  useEffect(() => {
    dispatch(retrieveArticle(id))
  }, [dispatch, id])

  const article = useSelector((state) => getArticle(state, id))
  const user = useSelector(getCurrentUser)

  const [displayBanner, setDisplayBanner] = useState(false)
  const closeBanner = () => setDisplayBanner(false)
  const [error, setError] = useState()
  const [toUpdate, setToUpdate] = useState(false)

  const [fields, setFields] = useState({
    title: article.title,
    image: article.image,
    description: article.description,
    price: article.price,
  })

  const handleChangeField = ({ target: { name, value } }) => setFields({ ...fields, [name]: value })

  const editArticle = () => (
    <>
      <form onSubmit={submitForm} id="editForm">
        <Input
          label="Titre"
          id="title"
          name="title"
          required
          value={fields.title}
          handleChange={handleChangeField}
        />
        <Input
          label="Url Image"
          name="image"
          id="image"
          type="url"
          required
          value={fields.image}
          handleChange={handleChangeField}
        />
        <Textarea
          label="Description"
          id="description"
          name="description"
          required
          value={fields.description}
          handleChange={handleChangeField}
        />
        <Input
          label="Prix"
          id="price"
          name="price"
          step="0.01"
          type="number"
          required
          value={fields.price}
          handleChange={handleChangeField}
        />
        <Button className="mt-4 bg-custom-main-color text-custom-light-color" type="submit" text="Enregistrer" />
      </form>
    </>
  )

  const showArticle = () => (
    <>
      <div className="p-4">
        <div className="text-center">
          <img
            className="w-28 h-28 mx-auto rounded-full object-cover"
            src={article.image}
            alt="article"
          />
          <p className="text-2xl font-bold text-custom-main-color pt-2">{article.title}</p>
        </div>
      </div>
      <div className="p-4">
        <fieldset className="border border-custom-main-color py-2 px-4 rounded-sm">
          <legend className="bg-white text-custom-main-color px-2">Description</legend>
          <span className="px-2 font-bold">{article.description}</span>
        </fieldset>
      </div>
      <div className="p-4">
        <fieldset className="border border-custom-main-color py-2 px-4 rounded-sm">
          <legend className="bg-white text-custom-main-color px-2">Prix</legend>
          <span className="px-2 font-bold">{article.price}</span>
        </fieldset>
      </div>
      <div className="p-4">
        <div className="flex flex-col mt-10">
          <label className="block text-sm font-medium text-custom-main-color" htmlFor="quantity">
            Quantité*
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            className="rounded-sm mt-1 border p-2 border-custom-main-color"
            placeholder="1"
          />
        </div>
        {error && <div className="p-4 my-4 rounded-md bg-red-100 border border-red-900"><p className="text-red-900">{error}</p></div>}
        <Button className="mt-4 bg-custom-main-color text-custom-light-color" text="Commander" />
      </div>
    </>
  )

  const btnAction = () => {
    if (toUpdate) {
      // Save user infos
      return document.querySelector('#editForm > button[type=submit]').click()
    }
    setToUpdate(!toUpdate)
  }

  const submitForm = async (e) => {
    e.preventDefault()
    setError(false)
    const checkRequired = Object.keys(fields).find((key) => fields[key] === '')
    if (checkRequired) {
      setError('Veuillez remplir tous les champs')
      return
    }

    const isOk = await dispatch(updateArticle({ id: article.id, ...fields }))

    if (isOk) {
      setDisplayBanner(true)
      setTimeout(function () {
        setDisplayBanner(false)
      }, 3000)
      setToUpdate(!toUpdate)
    } else setError('Une erreur est survenue !')
  }

  const edifyButton = () => (
    <div className="ml-auto">
      <button
        className="p-2 rounded-sm bg-custom-dark-color border-2 border-custom-dark-color text-custom-light-color"
        onClick={() => btnAction()}
      >
        {toUpdate ? 'Enregistrer' : 'Modifier'}
      </button>
    </div>
  )

  return (
    <div className="w-3/4 mx-auto my-8">
      {displayBanner && (
        <Banner text="L'article a été mise à jour avec succès" close={closeBanner} />
      )}
      <div className="p-8 rounded-md shadow-lg">
        <div className="flex justify-between">
          {user !== null && user.id === article.user_id ? edifyButton() : null}
        </div>
        {toUpdate ? editArticle() : showArticle()}
      </div>
    </div>
  )
}

export default Auth(Article)
