import dispatcher from "../appDispatcher.js";
import * as authorApi from "../api/authorApi";
import actionTypes from "./actionTypes";

export function loadCourses() {
  return authorApi.getAuthors().then((authors) => {
    dispatcher.dispatch({
      type: actionTypes.LOAD_AUTHORS,
      authors: authors,
    });
  });
}
