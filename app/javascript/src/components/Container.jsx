import React from "react";
import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <>
      <section className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">{children}</div>
      </section>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
