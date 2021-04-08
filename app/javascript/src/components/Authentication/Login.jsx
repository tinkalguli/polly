import React, { useState } from "react";

import authApi from "apis/auth";
import { logger } from "common/logger";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";

import LoginForm from "components/Authentication/Form/LoginForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        authToken: response.data.auth_token,
        email,
        userId: response.data.user_id,
        userFirstName: response.data.user_first_name,
      });
      setAuthHeaders();
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
