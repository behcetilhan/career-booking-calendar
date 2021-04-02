import * as Constants from './constants';

const { TIME_SLOTS } = Constants;

export const getStorage = (itemToGet) => {
  return JSON.parse(localStorage.getItem(itemToGet)) || '';
};

export const setStorage = (itemToStore) => {
  localStorage.setItem(TIME_SLOTS, JSON.stringify(itemToStore));
};

export const checkStorage = (itemToCheck) => {
  return localStorage.hasOwnProperty(itemToCheck);
};
