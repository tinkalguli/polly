import React from "react";

const ListPolls = ({ data, showPoll, updatePoll }) => {
  return <>
    <h1>List of Polls</h1>
    {
      data.map(poll => (
        <li key={poll.id}>
          <span onClick={() => showPoll(poll.id)}>{poll.title}</span> 
          <span className="px-6" onClick={() => updatePoll(poll.id)}>Edit</span>
        </li>
      ))
    }
  </>;
};

export default ListPolls;