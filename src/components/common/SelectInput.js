import React from "react";
import PropTypes from "prop-types";

function SelectInput(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.title}</label>
      <div className="field">
        <select
          id={props.id}
          name={props.name}
          value={props.value || " "}
          onChange={props.onChange}
          className="form-control"
        >
          <option value="" />
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}
SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
};

SelectInput.defaultProps = {
  error: "",
};

export default SelectInput;
