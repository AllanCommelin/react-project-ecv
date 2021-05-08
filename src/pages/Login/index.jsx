import LoginForm from '../../components/LoginForm';
import Auth from '../../hoc/auth'

const Login = () => <LoginForm />

export default Auth(Login);