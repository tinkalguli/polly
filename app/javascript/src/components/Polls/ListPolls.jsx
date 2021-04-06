import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "helpers/storage";

const ListPolls = ({ data, destroyPoll }) => {
  const userId = getFromLocalStorage("authUserId");
  
  return (
    <ul className="mb-8">
      {
        data.map(poll => (
          <li key={poll.id} className="bg-purple-100 flex justify-between items-center py-4 px-2 border-b hover:bg-opacity-75">
            <Link 
              to={`/polls/${poll.id}/show`}
              className="hover:text-purple-700 text-lg font-medium"
            >
              <i className="ri-arrow-right-circle-fill text-bb-purple align-middle pr-2 text-xl"></i>
              {poll.title}
            </Link>

            {
              userId == poll.user_id
              ? (<div className="flex justify-between items-center gap-x-2">
                  <Button
                    size="small"
                    type="link"
                    path={`/polls/${poll.id}/edit`}
                    buttonText="Edit"
                  />
                  <Button
                    size="small"
                    onClick={() => destroyPoll(poll.id)}
                    buttonText="Delete"
                  />
                </div>)
              : ""
            }
          </li>
        ))
      }
    </ul>
  );
};

ListPolls.propTypes = {
  data: PropTypes.array.isRequired,
  destroyPoll: PropTypes.func,
};

export default ListPolls;