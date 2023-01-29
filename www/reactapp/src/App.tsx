import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Top from "./pages/Top";
import Register from "./pages/Register";
import ProvideAuth, { PrivateRoute, PublicRoute } from "./hooks/AuthContext";

import "./App.css";

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <Route path={`/`} exact component={Top} />
          <Route path={`/login`} exact component={Login} />
          <Route path={`/register`} exact component={Register} />
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
