import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
    type = "button",
    size = "large",
    path = "",
    buttonText,
    onClick,
    loading,
    iconClass
}) => {

  if (type === "link") {
    return(
      <Link
        to={path}
        className={`inline-block relative px-5 py-2 text-sm font-medium
          transition duration-150 ease-in-out bg-bb-purple border
          border-transparent group hover:bg-purple-600 focus:outline-none leading-5
          text-white ${size === "small" ? "w-max rounded" : "w-full rounded-md"}`}
      >
        {
          iconClass
          ? <i className={`${iconClass} text-2xl pr-1 align-middle`}></i>
          : "" 
        }
        { buttonText }
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative flex justify-center px-5 py-2 inline-block
        text-sm font-medium leading-5 text-white transition duration-150
        ease-in-out bg-bb-purple border border-transparent
        group hover:bg-purple-600 focus:outline-none
        ${size === "small" ? "w-max rounded" : "w-full rounded-md"}`}
    >
      { iconClass ? <i className={`${iconClass} pr-1`}></i> : "" }
      { loading ? "Loading..." : buttonText }
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  path: PropTypes.string,
  iconClass: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
