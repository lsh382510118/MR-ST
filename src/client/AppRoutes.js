import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Applications from "./pages/Applications";
// import NotFoundPage from './NotFoundPage';

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/apps" component={Applications} />
      {/* <Route path="*" component={NotFoundPage} />   */}
    </Switch>
  );
}

export default AppRoutes;
