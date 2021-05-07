import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import CreateArticle from './pages/CreateArticle';
import './tailwind.output.css'

const App = () => (
  <Router>
    <Switch> 
      <Route path="/article/create" component={CreateArticle} />
    </Switch>
  </Router>
);

export default App;