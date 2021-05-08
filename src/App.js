import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Register from './pages/Register';
import Login from './pages/Login';
import Home from "./pages/Home";
import CreateArticle from './pages/CreateArticle';
import Articles from "./pages/Articles";
import Profile from "./pages/Profile";
import './tailwind.output.css'

const App = () => (
  <Router>
    <Switch> 
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/article/create" component={CreateArticle} />
      <Route path="/articles" component={Articles} />
      <Route path="/profile" component={Profile} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

export default App;