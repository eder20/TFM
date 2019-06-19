import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import P from "./components/P";
import NotFound from "./components/NotFound";

export default (
<Route component={P} path='/'>
    <Route component={Login} path='login' />
    <Route component={NotFound} path='*' />
  </Route>
)
