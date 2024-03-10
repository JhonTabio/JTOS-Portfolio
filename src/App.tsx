import { Route, Switch } from 'wouter';
import './App.css'
import Landing from './routes/Landing';
import CLI from './routes/CLI';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Landing}/>
        <Route path="/cli" component={CLI}/>
      </Switch>
    </>
  )
}

export default App
