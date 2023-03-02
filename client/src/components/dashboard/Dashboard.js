import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { DashboardActions } from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../reducers/profile";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);
  //因为这个dispatch不是由按键或其他条件唤醒的，为了让他只在进入页面时运行一次，所以需要useEffect

  const { user } = useSelector((state) => state.auth);
  const { myprofile, loading } = useSelector((state) => state.profile);

  return loading && myprofile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {myprofile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={myprofile.experience} />
          <Education education={myprofile.education} />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(deleteAccount());
              }}
            >
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info.</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
