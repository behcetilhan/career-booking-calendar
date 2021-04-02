import React, { createContext, useReducer } from 'react';
import { reducer } from '../reducer';

export const initialState = {
  returnedData: '',
  isLoading: true,
  apiErrorMessage: '',
  allocatedTimeSlots: [],
  selectedSlot: '',
  allocatedEventData: false
};

export const DataContext = createContext();

const AllocatedDateTimeProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default AllocatedDateTimeProvider;
