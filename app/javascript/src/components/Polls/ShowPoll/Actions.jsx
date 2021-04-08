import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "components/Button";

const Actions = ({ isVoted, loading, handleSubmit }) => {
  if (isVoted) {
    return (
      <div className="px-6 text-center">
        <p className="py-2 text-xl font-medium">Thanks for voting! 🎉</p>
        <Link
          className="text-bb-purple hover:text-purple-500 focus:underline
          hover:underline"
          to="/"
        >
          Go back to Home Page
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-6">
      <Button
        loading={loading}
        onClick={handleSubmit}
        size="small"
        buttonText="Submit"
      />
    </div>
  );
};

Actions.propTypes = {
  isVoted: PropTypes.bool,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

export default Actions;
