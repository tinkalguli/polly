import React from "react";
import { Link } from "react-router-dom";

import authApi from "apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";
import { logger } from "common/logger";
import { resetAuthTokens } from "apis/axios";

const NavBar = ({ isLoggedIn }) => {
  const userName = getFromLocalStorage("authUserFirstName");
  const userId = getFromLocalStorage("authUserId");

  const handleLogout = async () => {
    try {
      await authApi.logout(userId);
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userFirstName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <nav className="bg-white border-b">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="font-sans text-3xl font-semibold">
            <Link className="cursor-pointer" to="/">
              Polly
            </Link>
          </h1>
          <div className="flex items-center justify-end gap-x-4">
            {isLoggedIn ? (
              <>
                <span
                  className="inline-flex items-center px-2 pt-1 text-md font-regular leading-5 text-bb-gray-600
                  text-opacity-50 transition duration-150 ease-in-out border-b-2 border-transparent focus:outline-none
                  focus:text-bb-gray-700"
                >
                  {userName}
                </span>
                <a
                  onClick={handleLogout}
                  className="inline-flex items-center px-1 pt-1 text-md
                  font-semibold leading-5 text-bb-gray-600 text-opacity-50
                  transition duration-150 ease-in-out border-b-2
                  border-transparent hover:text-bb-gray-600 focus:outline-none
                  focus:text-bb-gray-700 cursor-pointer"
                >
                  LogOut
                </a>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-1 pt-1 text-md
                font-semibold leading-5 text-bb-gray-600 text-opacity-50
                transition duration-150 ease-in-out border-b-2
                border-transparent hover:text-bb-gray-600 focus:outline-none
                focus:text-bb-gray-700 cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
