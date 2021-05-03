import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/users'

const Post = ({ post, deletePost }) => {
  const user = useSelector(getCurrentUser)
  return (
    <div className="relative w-full border p-3 mb-2">
      <p className="font-semibold">{post.user.username}</p>
      <p>{post.text}</p>
      {user?.id === post.user.id && <button className="absolute top-2 right-2" onClick={() => deletePost(post.id)}>x</button>}
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired
    })
  }).isRequired,
  deletePost: PropTypes.func.isRequired
}

export default Post;