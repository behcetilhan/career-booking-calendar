import React, { useContext, useState } from 'react';
import moment from 'moment';
import { DataContext } from '../store/context';
import * as Types from '../store/reducer/types';
import {
  getStartOfHour,
  getEndOfHour,
  setAllocationId,
} from '../helpers/timeCalculations';
import CloseBtn from '../assets/images/close.svg';

const { SET_ALLOCATED_SLOTS, ADD_EVENT_GET_DETAILS } = Types;

const RegisterModal = () => {
  const [inputValue, setInputValue] = useState('');
  const [confirmMessage, setConfirmMessage] = useState(false);
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
    if (!!inputValue) {
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
      setConfirmMessage(true);
      //handleModalToggle();
    }
  };

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered b-modal-dialog">
          {selectedSlot !== 'past-date' ? (
            <>
              {!confirmMessage ? (
                <>
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
                        <button
                          type="submit"
                          className="btn btn-success"
                          disabled={!inputValue}
                        >
                          Confirm
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div className="modal-content b-confirm">
                    <div className="modal-body b-confirm__body">
                      <button
                        type="button"
                        className="btn b-modal-allocated__close"
                        onClick={() =>
                          dispatch({
                            type: ADD_EVENT_GET_DETAILS,
                            payload: '',
                          })
                        }
                      >
                        <img src={CloseBtn} alt="Close" />
                      </button>
                      <div className="b-confirm__svg">
                        <svg
                          className="b-confirm-checkmark"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 52 52"
                        >
                          <circle
                            className="b-confirm-checkmark__circle"
                            cx="26"
                            cy="26"
                            r="25"
                            fill="none"
                          />
                          <path
                            className="b-confirm-checkmark__check"
                            fill="none"
                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                          />
                        </svg>
                      </div>
                      <div className="b-confirm__message">
                        <span className="pr-1">You've booked a call for</span>
                        <span>{moment(selectedSlot).format('LLL')}</span>
                        <div>Event Description: {inputValue}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="btn b-modal-allocated__close"
                  onClick={() =>
                    dispatch({
                      type: ADD_EVENT_GET_DETAILS,
                      payload: '',
                    })
                  }
                >
                  <img src={CloseBtn} alt="Close" />
                </button>
                Please choose a valid date.
              </div>
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
