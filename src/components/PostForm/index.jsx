import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Textarea from '../Textarea';
import Button from '../Button';
import { getCurrentUser } from '../../store/users'

const PostForm = () => {
  const user = useSelector(getCurrentUser)
  const history = useHistory();
  const [text, setText] = useState('')

  const submitForm = async e => {
    e.preventDefault();

    if (text === '') {
      return;
    }

    try {
      await fetch(`${process.env.REACT_APP_API_URL}posts`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ text, userId: user.id })
      })
      setText('')
      history.push('/posts')
    } catch(e) {
      console.error(e)
    }
  }

  const handleChangeField = ({ target: { value } }) => setText(value)

  return (
    <>
      <h1 className="text-center text-3xl font-bold py-10">Creer un post</h1>
      <form onSubmit={submitForm} className="w-1/3 m-auto border rounded p-5">
        <Textarea  value={text} label="Post" name="post" id="post" handleChange={handleChangeField} />
        <Button type="submit" text="Ajouter un post" />
      </form>
    </>
  )
}

export default PostForm;