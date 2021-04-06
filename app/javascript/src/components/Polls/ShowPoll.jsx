import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "components/Button";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import { logger } from "common/logger";

const ShowPoll = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setTitle(response.data.poll.title);
      setOptions(response.data.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

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
            <li className="my-6 block w-full" key={option?.id}>
              <span
                className="border rounded p-3 w-3/4 inline-block cursor-pointer
                hover:bg-bb-purple hover:text-white"
              >
                {option?.content}
              </span>
              <span className="w-1/4"></span>
            </li>
          ))}
        </ul>
        <div className="flex justify-center px-6">
          <Button size="small" buttonText="Submit" />
        </div>
      </div>
    </Container>
  );
};

export default ShowPoll;
