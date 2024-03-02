import { useState } from 'react'
import { Route, Link, Switch } from 'wouter';
import './App.css'
import Landing from './routes/Landing';
import CLI from './routes/CLI';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Switch>
        <Route path="/" component={Landing}/>
        <Route path="cli" component={CLI}/>
      </Switch>
    </>
  )
}

export default App
