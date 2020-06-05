import React from "react";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        name="title"
        id="title"
        label="Title"
        value={props.course.title}
        onChange={props.onChange}
        error={props.errors.title}
      />

      <SelectInput
        id="author"
        name="authorId"
        label="Author"
        value={props.course.authorId}
        onChange={props.onChange}
        options={props.authors.map((author) => {
          return { value: author.id, title: author.name };
        })}
        error={props.errors.authorId}
      />

      <TextInput
        name="category"
        id="category"
        label="Category"
        value={props.course.category}
        onChange={props.onChange}
        error={props.errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

export default CourseForm;
