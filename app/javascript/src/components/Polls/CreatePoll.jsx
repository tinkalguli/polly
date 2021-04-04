import React, { useState } from "react";
import Container from "components/Container";
import PollForm from "components/Polls/Form/PollForm";
import pollsApi from "apis/polls";
import { logger } from "common/logger";

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.create({ poll: { title }, options: [
        { content: "option1" },
        { content: "option2" },
        { content: "option3" },
        { content: "option4" },
      ] });
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
        option1={option1}
        option2={option2}
        option3={option3}
        option4={option4}
        setTitle={setTitle}
        setOption1={setOption1}
        setOption2={setOption2}
        setOption3={setOption3}
        setOption4={setOption4}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreatePoll;