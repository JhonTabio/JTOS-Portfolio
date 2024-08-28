import { Route, Switch } from 'wouter';
import './App.css'
import Landing from './routes/Landing';
import CLI from './routes/CLI';
import GUI from "./routes/GUI"
import { DirProvider } from './components/CommandDir';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Landing}/>
        <DirProvider>
          <Route path="/cli" component={CLI}/>
          <Route path="/gui" component={GUI}/>
        </DirProvider>
      </Switch>
    </>
  )
}

export default App
