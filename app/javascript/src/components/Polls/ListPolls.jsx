import React from "react";

const ListPolls = ({ data }) => {
  return <>
    <h1>List of Polls</h1>
    {
      data.map(poll => (
        <li key={poll.id}>{poll.title}</li>
      ))
    }
  </>;
};

export default ListPolls;