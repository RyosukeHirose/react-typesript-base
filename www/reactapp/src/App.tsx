import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import UserLogin from "./pages/User/Login";
import ShopLogin from "./pages/Shop/Login";
import ShopTop from "./pages/Shop/Top";
import UserTop from "./pages/User/Top";
import UserRegister from "./pages/User/Register";
import ShopRegister from "./pages/Shop/Register";
import ProvideUserAuth, {
  // PrivateRoute,
  UserPublicRoute,
} from "./hooks/UserAuthContext";
import ProvidShoprAuth, {
  // PrivateRoute,
  ShopPublicRoute,
} from "./hooks/ShopAuthContext";

import "./App.css";

function App() {
  return (
    <ProvideUserAuth>
      <ProvidShoprAuth>
        <BrowserRouter>
          <Switch>
            <Route path={`/user`} exact component={UserTop} />
            <UserPublicRoute path={`/user/login`} exact>
              <UserLogin />
            </UserPublicRoute>
            <UserPublicRoute path={`/user/register`} exact>
              <UserRegister />
            </UserPublicRoute>

            <Route path={`/shop`} exact component={ShopTop} />

            <ShopPublicRoute path={`/shop/login`} exact>
              <ShopLogin />
            </ShopPublicRoute>
            <ShopPublicRoute path={`/shop/register`} exact>
              <ShopRegister />
            </ShopPublicRoute>
          </Switch>
        </BrowserRouter>
      </ProvidShoprAuth>
    </ProvideUserAuth>
  );
}

export default App;
