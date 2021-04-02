import React from 'react';

const CalendarToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  return (
    <div className="b-toolbar">
      <div className="b-toolbar__navigation">
        <div className="btn-group btn-group-sm">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => goToBack()}
          >
            back
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => goToCurrent()}
          >
            today
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => goToNext()}
          >
            next
          </button>
        </div>
      </div>
      <div className="b-toolbar__label">{toolbar.label}</div>
    </div>
  );
};

export default CalendarToolbar;
