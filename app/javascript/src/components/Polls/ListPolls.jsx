import React from "react";

const ListPolls = ({ data, showPoll, updatePoll }) => {
  return <>
    <h1>List of Polls</h1>
    {
      data.map(poll => (
        <li key={poll.id} onClick={showPoll}>{poll.title} 
          <span className="px-6" onClick={updatePoll}>Edit</span>
        </li>
      ))
    }
  </>;
};

export default ListPolls;