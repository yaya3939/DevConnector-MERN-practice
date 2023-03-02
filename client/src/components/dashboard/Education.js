import React, { Fragment } from "react";
import moment from "moment";

import { useDispatch } from "react-redux";
import { deleteE } from "../../reducers/profile";

const Education = (props) => {
  const dispatch = useDispatch();

  const educations = (edus) =>
    edus.map((edu) => {
      const from = moment(edu.from).format("YYYY/MM/DD");
      const to = moment(edu.to).format("YYYY/MM/DD");

      return (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td className="hide-sm">{edu.degree}</td>
          <td className="hide-sm">{edu.fieldofstudy}</td>
          <td>
            {from}-- {edu.to === null ? "Now" : to}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(deleteE({ field: "education", id: edu._id }));
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
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>school</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Field of Study</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{educations(props.education)}</tbody>
      </table>
    </Fragment>
  );
};

// Experience.propTypes = {
//   experience: PropTypes.array.isRequired,
// };

export default Education;
