import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createArticle } from '../../store/articles'
import Button from '../../components/Button'
import Textarea from '../../components/Textarea'
import Input from '../../components/Input'
import Banner from '../../components/Banner'

const CreateArticle = () => {
  const dispatch = useDispatch();
  const [displayBanner, setDisplayBanner] = useState(false)
  const [fields, setFields] = useState({
    title: '',
    image: 'https://picsum.photos/200',
    description: '',
    price: '0.00',
  })

  const handleChangeField = ({ target: { name, value } }) => {
    setFields({ 
      ...fields, 
      [name]: value
    })
  }

  const closeBanner = () => setDisplayBanner(false)

  const submitForm = (e) => {
    e.preventDefault();
    const checkRequired = Object.keys(fields).find(key => fields[key] === '')
    if (checkRequired || fields.price === '0.00') {
      return;
    }
    dispatch(createArticle({...fields}))
    setDisplayBanner(true)
    setFields({
      title: '',
      image: '',
      description: '',
      price: '0.00',
    })
  }

  return (
    <>
    <div className="container w-full md:w-2/3 mx-auto mt-10">
    <h1 className="text-3xl text-blue-500 font-bold">Création d'article</h1>
      <form onSubmit={submitForm}>
      {displayBanner && <Banner text="Article ajoute !" close={closeBanner} />}
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
        <Button className="mt-4" type="submit" text="Ajouter article" />
      </form>
    </div>
    </>
  )
}

export default CreateArticle;
