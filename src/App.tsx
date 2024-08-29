import { Route, Switch } from 'wouter';
import './App.css'
import Landing from './routes/Landing';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Landing}/>
      </Switch>
    </>
  )
}

export default App
