import { Route, Switch } from "wouter";
import "./App.css";
import Landing from "./routes/Landing";
import CLI from "./routes/CLI";
import GUI from "./routes/GUI";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Landing}/>
        <Route path="/cli" component={CLI}/>
        <Route path="/gui" component={GUI}/>
      </Switch>
    </>
  );
}

export default App;
