import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const RedirectRoute = ({ redirectRoute, ...props }) => {
  return (
    <Redirect
      to={{
        pathname: redirectRoute,
        from: props.location,
      }}
    />
  );
};

RedirectRoute.propTypes = {
  redirectRoute: PropTypes.string,
  location: PropTypes.object,
};

export default RedirectRoute;
