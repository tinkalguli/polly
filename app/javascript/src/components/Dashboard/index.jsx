import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import Button from "components/Button";
import Container from "components/Container";
import ListPolls from "components/Polls/ListPolls";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import { logger } from "common/logger";

const Dashboard = ({ isLoggedIn }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const destroyPoll = async (id) => {
    try {
      await pollsApi.destroy(id);
      await fetchPolls();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex justify-between items-center mt-8 py-4 border-b">
        <h1 className="text-bb-purple text-4xl font-medium">Polls</h1>
        {isLoggedIn ? (
          <Button
            size="small"
            type="link"
            path={`/polls/new`}
            buttonText="Create"
            iconClass="ri-add-line"
          />
        ) : (
          ""
        )}
      </div>
      {either(isNil, isEmpty)(polls) ? (
        <h1 className="text-3xl leading-5 text-center pt-6">
          No Polls Available 😔
        </h1>
      ) : (
        <ListPolls data={polls} destroyPoll={destroyPoll} />
      )}
    </Container>
  );
};

export default Dashboard;
