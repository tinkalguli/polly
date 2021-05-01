import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Actions from "./Actions";

const ListPolls = ({ data, destroyPoll }) => {
  return (
    <ul className="mb-8">
      {data.map((poll) => (
        <li
          key={poll.id}
          className="bg-purple-100 flex justify-between items-center py-4 px-2 border-b hover:bg-opacity-75"
        >
          <Link
            to={`/polls/${poll.id}/show`}
            className="hover:text-purple-700 text-lg font-medium"
          >
            <i className="ri-arrow-right-circle-fill text-bb-purple align-middle pr-2 text-xl"></i>
            {poll.title}
          </Link>
          <Actions
            destroyPoll={destroyPoll}
            pollUserId={poll.user_id}
            pollId={poll.id}
          />
        </li>
      ))}
    </ul>
  );
};

ListPolls.propTypes = {
  data: PropTypes.array.isRequired,
  destroyPoll: PropTypes.func,
};

export default ListPolls;
