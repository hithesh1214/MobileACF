import "C:/Users/hithe/Desktop/ACF/my-app/src/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from "./pages/Main";
import Admin from "./pages/Admin";
import User from "./pages/User";

function App() {
  const History = createBrowserHistory();
  return (
    <>
      <Router History={History}>
        <Switch>
          <Route path="/" exact component={Main}></Route>
          <Route path="/Admin" component={Admin}></Route>
          <Route path="/User" component={User}></Route>
          <Route component={Main}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
