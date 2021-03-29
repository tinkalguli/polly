import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import { Link } from "react-router-dom";

import Container from "components/Container";
import ListPolls from "components/Polls/ListPolls";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import { logger } from "common/logger";

const Dashboard = ({ history }) => {
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

  const destroyPoll = async id => {
    try {
      await pollsApi.destroy(id);
      await fetchPolls();
    } catch (error) {
      logger.error(error);
    }
  };

  const showPoll = id => {
    history.push(`/polls/${id}/show`);
  };

  const updatePoll = id => {
    history.push(`/polls/${id}/edit`);
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
      <div>
        <h1>Polls</h1>
        <Link to="/polls/create">Create</Link>
      </div>
      {
        either(isNil, isEmpty)(polls) ?
        <h1 className="text-xl leading-5 text-center">
          No Polls Available 😔
        </h1> :
        <ListPolls
          data={polls}
          showPoll={showPoll}
          updatePoll={updatePoll}
          destroyPoll={destroyPoll}
        />
      }
    </Container>
  );
};

export default Dashboard;