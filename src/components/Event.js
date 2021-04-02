import React from 'react';
import moment from 'moment';

const EventComponent = ({ event }) => {
  return (
    <div className={`b-event ${event.userEvent ? 'b-event-user' : ''}`}>
      <div className="b-event__description">{event.description}</div>
      <div className="b-event__time">
        <span>{moment(event.start).format('ha')}</span>-
        <span>{moment(event.end).add(1, 'seconds').format('ha')}</span>
      </div>
    </div>
  );
};

export default EventComponent;
