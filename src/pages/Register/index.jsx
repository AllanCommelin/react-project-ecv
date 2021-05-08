import RegisterForm from '../../components/RegisterForm';
import Auth from '../../hoc/auth'

const Register = () => <RegisterForm />

export default Auth(Register);