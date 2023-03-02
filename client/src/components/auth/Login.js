import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  login_matcher,
  loadUser,
  selectAuthenticated,
} from "../../reducers/auth";
import { alertAsync } from "../../reducers/alert";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const dispatch = useDispatch();

  const asyncAlert = (msg, alertType, time) => {
    dispatch(alertAsync(msg, alertType, time));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login_matcher({ email, password })).unwrap();
      dispatch(loadUser());
    } catch (error) {
      const errors = error.errors;
      errors.forEach((error) => {
        asyncAlert(error.msg, "danger", 5000);
      });
    }
  };

  const authenticated = useSelector(selectAuthenticated);
  if (authenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            minLength="6"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
