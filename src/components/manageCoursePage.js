import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";
import { toast } from "react-toastify";
import { getAuthors } from "../api/authorApi";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState([]);
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug;
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    getAuthors().then((_authors) => setAuthors(_authors));

    return () => courseStore.removeChangeListener(onChange);
  }, [authors.length, courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }
  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Title is required";
    if (!course.category) _errors.category = "Title is required";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};

export default ManageCoursePage;
