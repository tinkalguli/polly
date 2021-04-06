import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "components/Button";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import responsesApi from "apis/responses";
import { logger } from "common/logger";
import { getFromLocalStorage } from "helpers/storage";

const ShowPoll = () => {
  const { id } = useParams();
  const userId = getFromLocalStorage("authUserId");
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [votedOption, setVotedOption] = useState(null);
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
      setVotedOption(userResponses ? userResponses.option_id : userResponses);
      setIsVoted(Boolean(userResponses));
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
        response: { poll_id: id, option_id: votedOption },
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
            <li key={option?.id} className="my-6 block w-full">
              <span
                className={`border rounded p-3 w-3/4 inline-block cursor-pointer
                hover:bg-bb-purple hover:text-white ${
                  option.id === votedOption
                    ? "bg-purple-600 text-white shadow-md"
                    : ""
                } ${isVoted ? "pointer-events-none" : ""}`}
                onClick={() => setVotedOption(option.id)}
              >
                {option?.content}
              </span>
              {isVoted ? (
                <span className="w-1/4 pl-4">
                  {getVotePercentage(option.id)}%
                </span>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
        <div className="flex justify-center px-6">
          {isVoted ? (
            <p className="py-2 font-medium">Thanks for voting! 🎉</p>
          ) : (
            <Button
              loading={loading}
              onClick={handleSubmit}
              size="small"
              buttonText="Submit"
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default ShowPoll;
