import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getFromLocalStorage } from "helpers/storage";
import { logger } from "common/logger";
import pollsApi from "apis/polls";
import responsesApi from "apis/responses";

import Actions from "./Actions";
import Container from "components/Container";
import Option from "./Option";
import PageLoader from "components/PageLoader";

const ShowPoll = () => {
  const { id } = useParams();
  const userId = getFromLocalStorage("authUserId");
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [votedOptionId, setVotedOptionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  const [votes, setVotes] = useState([]);

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      const userResponses = response.data.responses.find(
        (v) => v.user_id == userId
      );
      setTitle(response.data.poll.title);
      setOptions(response.data.options);
      setVotes(response.data.responses);
      if (userResponses) {
        setVotedOptionId(userResponses.option_id);
        setIsVoted(Boolean(userResponses));
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await responsesApi.create({
        response: { poll_id: id, option_id: votedOptionId },
      });
      setLoading(false);
      fetchPollDetails();
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const getVotePercentage = (optionId) => {
    if (!votes.length) {
      return "0";
    }
    const filteredVotes = votes.filter((v) => v.option_id == optionId);
    const percentage = (filteredVotes.length / votes.length) * 100;
    return percentage % 1 ? percentage.toFixed(2) : percentage;
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="w-3/4 mx-auto shadow-2xl rounded-lg py-6 mt-10">
        <h1 className="pb-4 px-6 text-xl font-bold border-b text-bb-purple">
          {title}
        </h1>
        <ul className="mb-6 mt-3 px-6">
          {options?.map((option) => (
            <Option
              key={option.id}
              option={option}
              votedOptionId={votedOptionId}
              isVoted={isVoted}
              setVotedOptionId={setVotedOptionId}
              getVotePercentage={getVotePercentage}
            />
          ))}
        </ul>

        <Actions
          isVoted={isVoted}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
};

export default ShowPoll;
