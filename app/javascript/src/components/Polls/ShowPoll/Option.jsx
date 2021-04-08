import React from "react";
import PropTypes from "prop-types";

const Option = ({
  option,
  votedOptionId,
  isVoted,
  setVotedOptionId,
  getVotePercentage,
}) => {
  return (
    <li className="my-6 block w-full">
      <span
        className={`border rounded p-3 w-3/4 inline-block cursor-pointer
                hover:bg-bb-purple hover:text-white ${
                  option.id === votedOptionId
                    ? "bg-purple-600 text-white shadow-md"
                    : ""
                } ${isVoted ? "pointer-events-none" : ""}`}
        onClick={() => setVotedOptionId(option.id)}
      >
        {option?.content}
      </span>

      {isVoted ? (
        <span className="w-1/4 pl-4">{getVotePercentage(option.id)}%</span>
      ) : (
        ""
      )}
    </li>
  );
};

Option.propTypes = {
  option: PropTypes.object,
  isVoted: PropTypes.bool,
  setVotedOptionId: PropTypes.func,
  getVotePercentage: PropTypes.func,
};

export default Option;
