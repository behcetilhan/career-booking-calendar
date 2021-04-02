import React from 'react';

const Loading = () => {
  return (
    <div className="b-loading">
      <div className="b-loading-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="b-loading-content__svg"
        >
          <circle
            fill="none"
            stroke="#7858d7"
            strokeWidth="4"
            strokeMiterlimit="10"
            cx="50"
            cy="50"
            r="48"
          />
          <path
            fill="none"
            strokeLinecap="round"
            stroke="#7858d7"
            strokeWidth="4"
            strokeMiterlimit="10"
            d="M50 50l35 .5"
          >
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
          <path
            fill="none"
            strokeLinecap="round"
            stroke="#7858d7"
            strokeWidth="4"
            strokeMiterlimit="10"
            d="M50 50l-.5 24"
          >
            <animateTransform
              attributeName="transform"
              dur="15s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <div className="b-loading-content__text">
          Calendar is loading
        </div>
      </div>
    </div>
  );
};

export default Loading;
