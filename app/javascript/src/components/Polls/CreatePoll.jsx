import React, { useState } from "react";

import pollsApi from "apis/polls";
import { logger } from "common/logger";

import Container from "components/Container";
import PollForm from "components/Polls/Form/PollForm";

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
    { content: "" },
    { content: "" },
    { content: "" },
    { content: "" },
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await pollsApi.create({ poll: { title, options_attributes: options } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <PollForm
        title={title}
        options={options}
        setTitle={setTitle}
        setOptions={setOptions}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreatePoll;
