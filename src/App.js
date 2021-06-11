import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path={"/"}component={RegisterForm}/>
          {/*<Route path={"/list"}component={""}/>*/}
          {/*  <Route component={NotFound} />*/}
        </Switch>
      </Router>
  );
}

export default App;
