/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useStopwatch } from "react-timer-hook";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import IconButton from "@mui/material/IconButton";

const StopWatch = () => {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true });

  const formatTime = (time: any) => {
    return String(time).padStart(2, "0");
  };

  return (
    <div className="card text-center rounded">
      <h5 className="card-header mb-3">Timer</h5>
      <div className="card-body">
        <div className="d-flex flex-row justify-content-center">
          <div className="border border-light rounded shadow bg-warning text-black px-3 py-3">
            <strong>{formatTime(hours)}</strong>
          </div>

          <div className="border border-light rounded shadow bg-warning text-black px-3 py-3 ml-1">
            <strong>{formatTime(minutes)}</strong>
          </div>

          <div className="border border-light rounded shadow bg-warning text-black px-3 py-3 ml-1">
            <strong>{formatTime(seconds)}</strong>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center mt-3">
          <IconButton onClick={start}>
            <PlayArrowIcon></PlayArrowIcon>
          </IconButton>
          <IconButton onClick={pause}>
            <PauseIcon></PauseIcon>
          </IconButton>
          <IconButton
            onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds());
              reset(time);
            }}
          >
            <RestartAltIcon></RestartAltIcon>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
