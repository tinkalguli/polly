import React, { useState } from "react";

import authApi from "apis/auth";
import { logger } from "common/logger";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";

import SignUpForm from "components/Authentication/Form/SignUpForm";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await authApi.signup({
        user: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
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
      setLoading(false);
      logger.error(error);
    }
  };
  return (
    <SignUpForm
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignUp;
