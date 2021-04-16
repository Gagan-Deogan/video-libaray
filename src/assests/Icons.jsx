import React from "react";

export const HomeIcon = ({ isActive }) => {
  return (
    <svg
      id="home_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path id="Path_18" data-name="Path 18" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_19"
        data-name="Path 19"
        d="M10,20V14h4v6h5V12h3L12,3,2,12H5v8Z"
        fill={isActive ? "#059669" : "#111827"}
      />
    </svg>
  );
};

export const PlaylistIcon = ({ isActive }) => {
  return (
    <svg
      id="queue_music_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <g id="Group_1" data-name="Group 1">
        <rect
          id="Rectangle_35"
          data-name="Rectangle 35"
          width="24"
          height="24"
          fill="none"
        />
      </g>
      <g id="Group_2" data-name="Group 2">
        <path
          id="Path_20"
          data-name="Path 20"
          d="M15,6H3V8H15Zm0,4H3v2H15ZM3,16h8V14H3ZM17,6v8.18A3,3,0,1,0,19,17V8h3V6Z"
          fill={isActive ? "#059669" : "#111827"}
        />
      </g>
    </svg>
  );
};

export const HistoryIcon = ({ isActive }) => {
  console.log(isActive);
  return (
    <svg
      id="history_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path id="Path_16" data-name="Path 16" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_17"
        data-name="Path 17"
        d="M13,3a9,9,0,0,0-9,9H1l3.89,3.89.07.14L9,12H6a7.034,7.034,0,1,1,2.06,4.94L6.64,18.36A9,9,0,1,0,13,3ZM12,8v5l4.28,2.54L17,14.33l-3.5-2.08V8Z"
        fill={isActive ? "#059669" : "#111827"}
      />
    </svg>
  );
};

export const SaveIcon = ({ isActive }) => {
  return (
    <svg
      id="bookmark_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path id="Path_14" data-name="Path 14" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_15"
        data-name="Path 15"
        d="M17,3H7A2.006,2.006,0,0,0,5,5V21l7-3,7,3V5A2.006,2.006,0,0,0,17,3Z"
        fill={isActive ? "#059669" : "#111827"}
      />
    </svg>
  );
};
export const LikeIcon = ({ isActive }) => {
  return (
    <svg
      id="thumb_up_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path id="Path_21" data-name="Path 21" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_22"
        data-name="Path 22"
        d="M1,21H5V9H1ZM23,10a2.006,2.006,0,0,0-2-2H14.69l.95-4.57.03-.32a1.505,1.505,0,0,0-.44-1.06L14.17,1,7.59,7.59A1.955,1.955,0,0,0,7,9V19a2.006,2.006,0,0,0,2,2h9a1.987,1.987,0,0,0,1.84-1.22l3.02-7.05A1.976,1.976,0,0,0,23,12Z"
        fill={isActive ? "#059669" : "#111827"}
      />
    </svg>
  );
};
