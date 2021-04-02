import * as Types from './types';

const {
  GET_API_DATA,
  DATA_LOADED,
  API_ERROR,
  SET_ALLOCATED_SLOTS,
  TOGGLE_MODAL,
  ADD_EVENT_GET_DETAILS,
  GET_EVENT_DETAIL,
} = Types;

export const reducer = (state, action) => {
  switch (action.type) {
    case DATA_LOADED:
      return {
        ...state,
        isLoading: false,
      };
    case API_ERROR:
      return {
        ...state,
        apiErrorMessage: action.payload,
      };
    case GET_API_DATA:
      return {
        ...state,
        returnedData: action.payload,
      };
    case SET_ALLOCATED_SLOTS:
      return {
        ...state,
        allocatedTimeSlots: action.payload,
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modalState: action.payload,
      };
    case ADD_EVENT_GET_DETAILS:
      return {
        ...state,
        selectedSlot: action.payload,
      };
    case GET_EVENT_DETAIL:
      return {
        ...state,
        allocatedEventData: action.payload,
      };
    default:
      return state;
  }
};
