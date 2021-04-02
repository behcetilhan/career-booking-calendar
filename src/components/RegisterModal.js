import React, { useContext, useState } from 'react';
import moment from 'moment';
import { DataContext } from '../store/context';
import * as Types from '../store/reducer/types';
import {
  getStartOfHour,
  getEndOfHour,
  setAllocationId,
} from '../helpers/timeCalculations';

const { SET_ALLOCATED_SLOTS, ADD_EVENT_GET_DETAILS } = Types;

const RegisterModal = () => {
  const [inputValue, setInputValue] = useState('');
  const { state, dispatch } = useContext(DataContext);
  const { selectedSlot, allocatedTimeSlots } = state;

  const handleModalToggle = () => {
    dispatch({
      type: ADD_EVENT_GET_DETAILS,
      payload: '',
    });
  };

  const handleSetEvent = (e) => {
    e.preventDefault();
    dispatch({
      type: SET_ALLOCATED_SLOTS,
      payload: [
        ...allocatedTimeSlots,
        {
          start: getStartOfHour(selectedSlot),
          end: getEndOfHour(selectedSlot),
          description: inputValue,
          id: setAllocationId(selectedSlot),
          userEvent: true,
        },
      ],
    });
    handleModalToggle();
  };

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered b-modal-dialog">
          {selectedSlot !== 'past-date' ? (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <span className="pr-1">Book a call for</span>
                  <span>{moment(selectedSlot).format('LLL')}</span>
                </h5>
              </div>
              <form onSubmit={handleSetEvent}>
                <div className="modal-body">
                  <input
                    autoFocus
                    type="text"
                    value={inputValue}
                    className="form-control"
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Reason For the Call"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleModalToggle()}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-success">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <span className="pr-1">Book a call for</span>
                  <span>Past Date</span>
                </h5>
              </div>
              adasds
            </div>
          )}
        </div>
        <div
          onClick={() => handleModalToggle()}
          className="modal-backdrop fade show"
        ></div>
      </div>
    </>
  );
};

export default RegisterModal;
