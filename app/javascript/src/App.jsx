import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger, logger } from "common/logger";
import Dashboard from "./components/Dashboard";

const App = () => {
  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    logger.info("Log from js-logger");
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/about" render={() => <div>About</div>} />
      </Switch>
    </Router>
  );
};

export default App;
