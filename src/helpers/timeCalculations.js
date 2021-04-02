import moment from 'moment';

export const getStartOfHour = (timeToCalculate) => {
  return new Date(
    moment(timeToCalculate.toString()).startOf('hour').toString()
  );
};

export const getEndOfHour = (timeToCalculate) => {
  return new Date(moment(timeToCalculate.toString()).endOf('hour').toString());
};

export const setAllocationId = (timeToCalculate) => {
  return new Date(moment(timeToCalculate.toString())).valueOf() / 1000;
};
