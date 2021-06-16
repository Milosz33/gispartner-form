import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import NotFound from "./components/NotFound";
import {UsersList} from "./pages/UsersList/UsersList";
import {Home} from "./pages/Home/Home";
import {Navigation} from "./components/Navigation";


function App() {
  return (
      <Router>
          <Navigation></Navigation>
        <Switch>
            <Route exact path={"/"}component={Home}/>
            <Route path={"/form"}component={RegisterForm}/>
            <Route path={"/list"}component={UsersList}/>
            <Route component={NotFound} />
        </Switch>
      </Router>
  );
}

export default App;
