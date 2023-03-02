import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { alertAsync } from "../../reducers/alert";
import {
  registerUser_matcher,
  loadUser,
  selectAuthenticated,
} from "../../reducers/auth";

// import propTypes from "prop-types";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //redux
  const dispatch = useDispatch();

  const asyncAlert = (msg, alertType, time) => {
    dispatch(alertAsync(msg, alertType, time));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      asyncAlert("Passwords do not match", "danger", 3000);
    } else {
      try {
        await dispatch(
          registerUser_matcher({ name, email, password })
        ).unwrap();
        dispatch(loadUser());
      } catch (error) {
        const errors = error.errors;
        errors.forEach((error) => {
          asyncAlert(error.msg, "danger", 5000);
        });
      }
    }
  };

  const authenticated = useSelector(selectAuthenticated);
  if (authenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            // required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            // minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
            // minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

// Register.propTypes = {
//   setAlert: propTypes.func.isRequired,
// };

export default Register;
