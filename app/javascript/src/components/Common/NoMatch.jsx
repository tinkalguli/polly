import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <section className="min-screen">
      <center>
        {/* <img
          className="error-page__image"
          src="images/404-error.svg"
          alt="no match"
        /> */}
        <h1 className="text-3xl">☹️ 404 Page Not Found</h1>
        <Link
          className="text-bb-purple hover:text-purple-500 focus:underline
          hover:underline"
          to="/"
        >
          Go back to Home Page
        </Link>
      </center>
    </section>
  );
}

export default NoMatch;
