import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div>
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Automobile Manufacturers</h1>
        <p className="lead">
          A complete list of car manufacturers. Choose your favorites!
        </p>
        <hr className="my-4" />
        <Link
          to="/records"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Lists
        </Link>
      </div>
    </div>
  </div>
  </div>
);