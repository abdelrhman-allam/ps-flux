import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import { getAuthors } from "../api/authorApi";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import store from "../stores/courseStore";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(store.getCourses());
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    store.addChangeListener(onChange);
    getAuthors().then((_authors) => setAuthors(_authors));
    if (courseStore.getCourses().length === 0) loadCourses();

    return () => {
      store.removeChangeListener(onChange);
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
