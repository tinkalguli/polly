import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <center>
        <img className="w-2/4" src="/images/404-error.svg" alt="no match" />
        <h1 className="text-4xl mb-1">Page Not Found ☹️</h1>
        <Link
          className="text-bb-purple hover:text-purple-500 focus:underline
          hover:underline text-2xl"
          to="/"
        >
          Go back to Home Page
        </Link>
      </center>
    </section>
  );
};

export default NoMatch;
