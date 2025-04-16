import { Route, Switch } from "wouter";
import { WindowProvider } from "./components/WindowContext";
import Landing from "./routes/Landing";
import CLI from "./routes/CLI";
import GUI from "./routes/GUI";
import "./App.css";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Landing}/>
        <Route path="/cli" component={CLI}/>
        <WindowProvider>
          <Route path="/gui" component={GUI}/>
        </WindowProvider>
      </Switch>
    </>
  );
}

export default App;
