import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout, selectAuthenticated } from "../../reducers/auth";

const Navbar = () => {
  const loading = useSelector((state) => state.auth.loading);
  const authenticated = useSelector(selectAuthenticated);
  const dispatch = useDispatch();

  const authLink = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/" onClick={() => dispatch(logout())}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLink = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>

      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && <Fragment>{authenticated ? authLink : guestLink}</Fragment>}
    </nav>
  );
};

export default Navbar;
