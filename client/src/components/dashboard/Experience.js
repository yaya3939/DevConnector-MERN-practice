import React, { Fragment } from "react";
import moment from "moment";

import { useDispatch } from "react-redux";
import { deleteE } from "../../reducers/profile";

const Experience = (props) => {
  const dispatch = useDispatch();

  const experiences = (exps) =>
    exps.map((exp) => {
      const from = moment(exp.from).format("YYYY/MM/DD");
      const to = moment(exp.to).format("YYYY/MM/DD");

      return (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td className="hide-sm">{exp.title}</td>
          <td>
            {from}-- {exp.to === null ? "Now" : to}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(deleteE({ field: "experience", id: exp._id }));
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{experiences(props.experience)}</tbody>
      </table>
    </Fragment>
  );
};

// Experience.propTypes = {
//   experience: PropTypes.array.isRequired,
// };

export default Experience;
