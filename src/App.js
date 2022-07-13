import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPage from "./pages/LoginPage";
import Admin from "./pages/Admin";
import User from "./pages/User";

function App() {
  const History = createBrowserHistory();
  return (
    <>
      <Router History={History}>
        <Switch>
          <Route path="/" exact component={LoginPage}></Route>
          <Route path="/Admin" component={Admin}></Route>
          <Route path="/User" component={User}></Route>
          <Route component={LoginPage}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
