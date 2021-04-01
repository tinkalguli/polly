import React, { useEffect, useState } from "react";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "common/logger";
import { getFromLocalStorage } from "helpers/storage";
import Dashboard from "components/Dashboard";
import CreatePoll from "components/Polls/CreatePoll";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import PageLoader from "components/PageLoader";
import ShowPoll from "components/Polls/ShowPoll";
import EditPoll from "components/Polls/EditPoll";
import SignUp from "components/Authentication/SignUp";
import Login from "components/Authentication/Login";
import RedirectRoute from "components/Common/RedirectRoute";
import NavBar from "components/NavBar";
import NoMatch from "components/Common/NoMatch";

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
      <Switch>
        <Route exact path="/" component={Dashboard} isLoggedIn={isLoggedIn}/>
        {
          isLoggedIn ?
          <AuthenticatedRoutes /> :
          <UnAuthenticatedRoutes />
        }
      </Switch>
    </Router>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <>
      <Route exact path="/polls/create" component={CreatePoll} />
      <Route exact path="/polls/:id/show" component={ShowPoll} />
      <Route exact path="/polls/:id/edit" component={EditPoll} />
      <Route path="*" component={NoMatch} />
    </>
  );
}

const UnAuthenticatedRoutes = () => {
  return (
    <>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <RedirectRoute path="*" redirectRoute="/login" />
    </>
  );
}

export default App;
