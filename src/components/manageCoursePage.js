import React from "react";
import { getCourseBySlug } from "../api/courseApi";

const ManageCoursePage = (props) => {
  return (
    <>
      <h2>Manage Course</h2>
      <p>{props.match.params.slug}</p>
    </>
  );
};

export default ManageCoursePage;
