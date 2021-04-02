import React, { useContext } from 'react';
import { DataContext } from '../store/context';
import ArrowBtn from '../assets/images/arrow.svg';
import TodayBtn from '../assets/images/today.svg';

const PLACEHOLDER_IMAGE = 'https://www.placecage.com/300/206';

const CalendarToolbar = (toolbar) => {
  const { state } = useContext(DataContext);
  const { returnedData } = state;

  const getMentor = () => {
    if (returnedData && returnedData.mentor) {
      return (
        <div className="b-toolbar__instructor-name">
          {Object.values(returnedData.mentor)[0]}
        </div>
      );
    }
  };

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
      <div className="b-toolbar__info">
        <div className="b-toolbar__navigation">
          <button
            type="button"
            className="btn b-toolbar__navigation-btn b-toolbar__navigation-btn--prev"
            onClick={() => goToBack()}
          >
            <img src={ArrowBtn} alt="Previous" />
          </button>
          <button
            type="button"
            className="btn b-toolbar__navigation-btn b-toolbar__navigation-btn--today"
            onClick={() => goToCurrent()}
          >
            <img src={TodayBtn} alt="Today" />
          </button>
          <button
            type="button"
            className="btn b-toolbar__navigation-btn b-toolbar__navigation-btn--next"
            onClick={() => goToNext()}
          >
            <img src={ArrowBtn} alt="Next" />
          </button>
        </div>
        <div className="b-toolbar__label">{toolbar.label}</div>
      </div>
      <div className="b-toolbar__instructor">
        <div
          className="b-toolbar__instructor-avatar"
          style={{
            backgroundImage: `url(${PLACEHOLDER_IMAGE})`,
          }}
        ></div>
        <div className="b-toolbar__instructor-details">
          {getMentor()}
          <div className="b-toolbar__instructor-info">Weekly Schedule</div>
        </div>
      </div>
    </div>
  );
};

export default CalendarToolbar;
