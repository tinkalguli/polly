import React, { useEffect, useState } from "react";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { getFromLocalStorage } from "helpers/storage";
import { initializeLogger } from "common/logger";
import { registerIntercepts, setAuthHeaders } from "apis/axios";

import CreatePoll from "components/Polls/CreatePoll";
import Dashboard from "components/Dashboard";
import EditPoll from "components/Polls/EditPoll";
import Login from "components/Authentication/Login";
import NavBar from "components/NavBar";
import NoMatch from "components/Common/NoMatch";
import PageLoader from "components/PageLoader";
import RedirectRoute from "components/Common/RedirectRoute";
import ShowPoll from "components/Polls/ShowPoll";
import SignUp from "components/Authentication/SignUp";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <NavBar isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <AuthenticatedRoutes isLoggedIn={isLoggedIn} />
      ) : (
        <UnAuthenticatedRoutes isLoggedIn={isLoggedIn} />
      )}
    </Router>
  );
};

const AuthenticatedRoutes = ({ isLoggedIn }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/polls/new" component={CreatePoll} />
      <Route exact path="/polls/:id/show" component={ShowPoll} />
      <Route exact path="/polls/:id/edit" component={EditPoll} />
      <Route exact path="*" component={NoMatch} />
    </Switch>
  );
};

const UnAuthenticatedRoutes = ({ isLoggedIn }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <RedirectRoute path="*" redirectRoute="/login" />
    </Switch>
  );
};

export default App;
