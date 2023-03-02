import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { getGithubRepos } from "../../reducers/profile";

const ProfileGithub = ({ username }) => {
  const repos = useSelector((state) => state.profile.repos);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getGithubRepos(username)).unwrap();
    } catch (error) {
      console.log(error.msg);
    }
  }, [dispatch]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos === null || !repos ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.descreption}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = { username: PropTypes.string.isRequired };

export default ProfileGithub;
