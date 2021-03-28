import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Container = ({ children }) => {
  return (
    <>
      <section className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div>
          <h1>Polls</h1>
          <Link to="/polls/create">Create</Link>
        </div>
        <div className="max-w-3xl mx-auto">{children}</div>
      </section>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
