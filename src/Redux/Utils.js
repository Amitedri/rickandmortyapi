import * as utils from "./Slice";
export const setCharactersList = (dispatch, value) => {
  dispatch(utils.setCharactersList(value));
  return;
};

export const setCurrentIndex = (dispatch, value) => {
  dispatch(utils.setCurrentIndex(value));
  return;
};

export const setStatusFilter = (dispatch, value) => {
  dispatch(utils.setStatusFilter(value));
  return;
};
export const setGenderFilter = (dispatch, value) => {
  dispatch(utils.setGenderFilter(value));
  return;
};
export const setTermFilter = (dispatch, value) => {
  dispatch(utils.setTermFilter(value));
  return;
};

export const setCurrentChar = (dispatch, value) => {
  dispatch(utils.setCurrentChar(value));
  return;
};

export const setSpeciesFilter = (dispatch, value) => {
  dispatch(utils.setSpeciesFilter(value));
  return;
};
