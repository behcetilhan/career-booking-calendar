import React, { useEffect, useContext } from 'react';
import * as Types from '../store/reducer/types';
import * as Constants from '../helpers/constants';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import EventComponent from './Event';

import useFetch from '../helpers/useFetch';
import { getStorage, checkStorage, setStorage } from '../helpers/storageData';
import {
  getStartOfHour,
  getEndOfHour,
  setAllocationId,
} from '../helpers/timeCalculations';
import { cfCalendarApi } from '../api';
import { DataContext } from '../store/context';
import RegisterModal from './RegisterModal';
import Loading from './Loading';
import CalendarToolbar from './CalendarToolbar';
import AllocatedEvent from './AllocatedEvent';

const localizer = momentLocalizer(moment);
const { TIME_SLOTS } = Constants;
const { SET_ALLOCATED_SLOTS, ADD_EVENT_GET_DETAILS, GET_EVENT_DETAIL } = Types;

const CareerCalendar = () => {
  useFetch({
    api: cfCalendarApi,
    method: 'get',
    url: '/mentors/1/agenda',
  });
  const { state, dispatch } = useContext(DataContext);
  const {
    returnedData,
    allocatedTimeSlots,
    isLoading,
    apiErrorMessage,
    allocatedEventData,
    selectedSlot,
  } = state;

  const setAllocatedTime = (dateToConvert) => {
    return {
      start: getStartOfHour(dateToConvert),
      end: getEndOfHour(dateToConvert),
    };
  };

  useEffect(() => {
    if (returnedData) {
      getAllocations();
    }
  }, [returnedData]);

  useEffect(() => {
    if (allocatedTimeSlots.length > 0) {
      setStorage(allocatedTimeSlots);
    }
  }, [allocatedTimeSlots]);

  const getAllocations = () => {
    const allocatedTimeSlots = [];

    if (checkStorage(TIME_SLOTS)) {
      console.log('aaa');
      getStorage(TIME_SLOTS).map((timeEntries) => {
        allocatedTimeSlots.push({
          ...timeEntries,
          start: new Date(timeEntries.start),
          end: new Date(timeEntries.end),
        });
      });
    } else {
      console.log('bbb');
      if (returnedData && returnedData.calendar) {
        returnedData.calendar.map((date) => {
          const allocatedItem = {};
          Object.assign(allocatedItem, setAllocatedTime(Object.values(date)), {
            description: 'allocated',
            id: setAllocationId(Object.values(date)),
            userEvent: false,
          });
          allocatedTimeSlots.push(allocatedItem);
        });
      }
    }

    dispatch({
      type: SET_ALLOCATED_SLOTS,
      payload: allocatedTimeSlots,
    });
  };

  const handleSelect = ({ start }) => {
    dispatch({
      type: ADD_EVENT_GET_DETAILS,
      payload: start,
    });
  };

  const handleAllocatedEvent = (event) => {
    dispatch({
      type: GET_EVENT_DETAIL,
      payload: event,
    });
  };

  return (
    <div>
      <div className="container">
        {isLoading && <Loading />}
        <div className="row">
          <div className="col-12">
            <Calendar
              selectable
              localizer={localizer}
              views={['week']}
              defaultView="week"
              events={allocatedTimeSlots}
              startAccessor="start"
              step={60}
              timeslots={1}
              endAccessor="end"
              onSelectEvent={(event) => handleAllocatedEvent(event)}
              onSelectSlot={handleSelect}
              components={{
                event: EventComponent,
                toolbar: CalendarToolbar,
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {selectedSlot && <RegisterModal />}
            {allocatedEventData && <AllocatedEvent />}
            {apiErrorMessage && <h3>{apiErrorMessage}</h3>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerCalendar;
