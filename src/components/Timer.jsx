import React, { useState, useCallback, useEffect } from 'react';
import { format2Digit } from '../utils/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons';

const Timer = ({
  mode,
  isRunning,
  onToggle,
  onReset,
  onPlay,
  timerMinutes,
  increaseMinute,
}) => {
  const [timerSeconds, setTimerSeconds] = useState(0); 
  const alert = document.getElementById('beep');

  const decreaseTimer = useCallback(() => {
    if (timerSeconds === 0) {
      if (timerMinutes === 0) {
        onToggle();
        alert.currentTime = 0;
        alert.play();
      } else {
        increaseMinute();
        setTimerSeconds(59);
      }
    } else {
      setTimerSeconds(timerSeconds - 1);
    }
  }, [timerSeconds, increaseMinute, timerMinutes, onToggle, alert]);

  const handleReset = useCallback(() => {
    setTimerSeconds(0);
    onReset();
  }, [onReset]);

  useEffect(() => {
    if (isRunning) {
      let intervalId = setInterval(decreaseTimer, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning, decreaseTimer]);

  return (
    <section className='display align-column'>
      <h2 id='timer-label'>{mode} time</h2>
      <div id='time-left'>
        <h1>{format2Digit(timerMinutes)}</h1>
        <h1>:</h1>
        <h1>{timerSeconds ? format2Digit(timerSeconds) : '00'}</h1>
      </div>

      <div className='control-buttons'>
        <button id='start_stop' onClick={onPlay}>
          <FontAwesomeIcon icon={!isRunning ? faPlay : faPause} />
        </button>
        <button id='reset' onClick={handleReset}>
          <FontAwesomeIcon icon={faUndo} />
        </button>
      </div>

      <audio
        id='beep'
        autoPlay={false}
        src='https://www.soundjay.com/button/sounds/beep-08b.mp3'
      />
    </section>
  );
};

export default Timer;
