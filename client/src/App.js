import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import { CreateProfile } from "./components/profile-form/CreateProfile";
import { EditProfile } from "./components/profile-form/EditProfile";
import { AddExperience } from "./components/profile-form/AddExperience";
import { AddEducation } from "./components/profile-form/AddEducation";
import { Profiles } from "./components/profiles/Profiles";
import { Profile } from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import { Post } from "./components/post/Post";
import { NotFound } from "./components/layout/NotFound";

//redux
import { useDispatch } from "react-redux";
import { loadUser } from "./reducers/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    // <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            element={
              <section className="container">
                <Alert />
                <Outlet />
              </section>
            }
          >
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:id" element={<Profile />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/add-experience" element={<AddExperience />} />
              <Route path="/add-education" element={<AddEducation />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:id" element={<Post />} />
            </Route>
            {/* <Routes> looks through all its child routes to find the best match and renders that branch of the UI. 
             If a route path pattern ends with /* then it will match any characters following the /
             两者效果相加，再把404放到最后检测，产生了除以上route以外，全都是404的效果 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Fragment>
    </Router>
    // </Provider>
  );
};

export default App;
