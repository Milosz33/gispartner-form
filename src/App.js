import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import NotFound from "./components/NotFound";
import { UsersList } from "./pages/UsersList/UsersList";
import { Home } from "./pages/Home/Home";
import { Navigation } from "./components/Navigation";
import { Map } from "./components/Map";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchedUsers = window.localStorage.getItem("users");
    setUsers(fetchedUsers ? JSON.parse(fetchedUsers) : []);
  }, []);

  return (
    <Router>
      <Navigation></Navigation>
      <Map users={users}></Map>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route
          path={"/form"}
          render={(props) => <RegisterForm setUsers={setUsers} {...props} />}
        />
        <Route path={"/list"} component={UsersList} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
