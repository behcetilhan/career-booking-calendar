import React, { useContext } from 'react';
import { DataContext } from '../store/context';
import * as Types from '../store/reducer/types';
import CloseBtn from '../assets/images/close.svg';

const { GET_EVENT_DETAIL } = Types;

const AllocatedEvent = () => {
  const { state, dispatch } = useContext(DataContext);
  const { allocatedEventData } = state;

  return (
    <>
      <div className={`modal fade ${allocatedEventData ? 'show d-block' : ''}`}>
        <div className="modal-dialog modal-dialog-centered b-modal-dialog">
          <div className="modal-content b-modal-allocated">
            <div className="modal-body">
              <button
                type="button"
                className="btn b-modal-allocated__close"
                onClick={() =>
                  dispatch({
                    type: GET_EVENT_DETAIL,
                    payload: '',
                  })
                }
              >
                <img src={CloseBtn} alt="Close" />
              </button>

              <div className="b-modal-allocated__title">
                {allocatedEventData.userEvent ? (
                  <div>
                    <div>You've booked this time slot!</div>
                    <div>{allocatedEventData.description}</div>
                  </div>
                ) : (
                  <span>Time Slot is already booked</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() =>
            dispatch({
              type: GET_EVENT_DETAIL,
              payload: '',
            })
          }
          className={`modal-backdrop fade ${allocatedEventData ? 'show' : ''}`}
        ></div>
      </div>
    </>
  );
};

export default AllocatedEvent;
