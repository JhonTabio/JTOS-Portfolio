import { Route, Switch } from 'wouter';
import './App.css'
import Landing from './routes/Landing';
import CLI from './routes/CLI';
import { DirProvider } from './components/CommandDir';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Landing}/>
        <DirProvider>
          <Route path="/cli" component={CLI}/>
        </DirProvider>
      </Switch>
    </>
  )
}

export default App
