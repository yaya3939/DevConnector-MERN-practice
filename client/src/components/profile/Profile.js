import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { ProfileTop } from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../../reducers/profile";

export const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { myprofile, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const {
    user: authUser,
    isAuthenticated,
    loading: authLoading,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfileById(id));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Fragment>
      {myprofile === null || profileLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {isAuthenticated &&
            authLoading === false &&
            authUser._id === myprofile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={myprofile} />
            <ProfileAbout profile={myprofile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {myprofile.experience.length > 0 ? (
                <Fragment>
                  {myprofile.experience.map((exp) => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {myprofile.education.length > 0 ? (
                <Fragment>
                  {myprofile.education.map((edu) => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education Credentials</h4>
              )}
            </div>
            {myprofile.githubusername && (
              <ProfileGithub username={myprofile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
