import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import { getAuthors } from "../api/authorApi";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    getAuthors().then((_authors) => setAuthors(_authors));
    if (courseStore.getCourses().length === 0) loadCourses();

    return () => {
      courseStore.removeChangeListener(onChange);
    };
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }
  return (
    <>
      <h1>Courses</h1>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList
        courses={courses}
        authors={authors}
        deleteCourse={deleteCourse}
      />
    </>
  );
}

export default CoursesPage;
