import React from "react";
import PropTypes from "prop-types";

const ListPolls = ({ data, showPoll, updatePoll, destroyPoll }) => {
  return <>
    <h1>List of Polls</h1>
    {
      data.map(poll => (
        <li key={poll.id}>
          <span onClick={() => showPoll(poll.id)}>{poll.title}</span> 
          <span className="px-6" onClick={() => updatePoll(poll.id)}>Edit</span>
          <span className="px-6" onClick={() => destroyPoll(poll.id)}>Delete</span>
        </li>
      ))
    }
  </>;
};

ListPolls.propTypes = {
  data: PropTypes.array.isRequired,
  showPoll: PropTypes.func,
  updatePoll: PropTypes.func,
  destroyPoll: PropTypes.func,
};

export default ListPolls;