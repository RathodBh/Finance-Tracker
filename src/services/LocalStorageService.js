import { NAME } from "../utils/Constants";

export const getData = () => {
  if (localStorage.getItem(NAME)) {
    return JSON.parse(localStorage.getItem(NAME));
  } else {
    return false;
  }
};