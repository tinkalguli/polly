import React from "react";
import PropTypes from "prop-types";

import { getFromLocalStorage } from "helpers/storage";

import Button from "components/Button";

const Actions = ({ destroyPoll, pollId, pollUserId }) => {
  const userId = +getFromLocalStorage("authUserId");

  if (userId !== pollUserId) {
    return null;
  }

  return (
    <div className="flex justify-between items-center gap-x-2">
      <Button
        size="small"
        type="link"
        path={`/polls/${pollId}/edit`}
        buttonText="Edit"
      />
      <Button
        size="small"
        onClick={() => destroyPoll(pollId)}
        buttonText="Delete"
      />
    </div>
  );
};

Actions.propTypes = {
  destroyPoll: PropTypes.func,
  pollUserId: PropTypes.number,
  pollId: PropTypes.number,
};

export default Actions;
