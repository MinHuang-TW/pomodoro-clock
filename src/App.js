import React, { useState, useCallback } from 'react';
import { decrement, increment } from './utils/functions';
import Control from './components/Control';
import Timer from './components/Timer';

const App = () => {
  const defaultWork = 25,
        defaultBreak = 5;
  const [workLength, setWorkLength] = useState(defaultWork);
  const [breakLength, setBreakLength] = useState(defaultBreak);
  const [mode, setMode] = useState('work');
  const [timerMinutes, setTimerMinutes] = 
    useState(mode === 'work' ? workLength : breakLength);
  const [isRunning, setIsRunning] = useState(false);

  const decrementWorkLength = useCallback(() => {
    const totalWork = decrement(workLength);
    setWorkLength(totalWork);
    if (mode === 'work') setTimerMinutes(totalWork);
  }, [mode, workLength]);

  const incrementWorkLength = useCallback(() => {
    const totalWork = increment(workLength);
    setWorkLength(totalWork);
    if (mode === 'work') setTimerMinutes(totalWork);
  }, [mode, workLength]);

  const decrementBreakLength = useCallback(() => {
    const totalBreak = decrement(breakLength);
    setBreakLength(totalBreak);
    if (mode !== 'work') setTimerMinutes(totalBreak);
  }, [mode, breakLength]);

  const incrementBreakLength = useCallback(() => {
    const totalBreak = increment(breakLength);
    setBreakLength(increment(breakLength));
    if (mode !== 'work') setTimerMinutes(totalBreak);
  }, [mode, breakLength]);

  const resetTimer = useCallback(() => {
    setWorkLength(defaultWork);
    setBreakLength(defaultBreak);
    setTimerMinutes(defaultWork);
    setMode('work');
    setIsRunning(false);
  }, []);

  const togglePlay = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const increaseMinute = () => {
    setTimerMinutes(timerMinutes - 1);
  };

  const toggleMode = useCallback(() => {
    if (mode === 'work') {
      setMode('break');
      setTimerMinutes(breakLength);
    } else {
      setMode('work');
      setTimerMinutes(workLength);
    }
  }, [mode, workLength, breakLength]);

  return (
    <main className={`main ${mode}-background`}>
      <header className='align-column'>
        <h1>Pomodoro Clock</h1>
        <p>Front End Libraries Project</p>
      </header>

      <Timer
        mode={mode}
        timerMinutes={timerMinutes}
        increaseMinute={increaseMinute}
        isRunning={isRunning}
        onToggle={toggleMode}
        onPlay={togglePlay}
        onReset={resetTimer}
      />

      <div className='controls align-row'>
        <Control
          mode='session'
          isRunning={isRunning}
          length={workLength}
          onDecrement={decrementWorkLength}
          onIncrement={incrementWorkLength}
        />
        <Control
          mode='break'
          isRunning={isRunning}
          length={breakLength}
          onDecrement={decrementBreakLength}
          onIncrement={incrementBreakLength}
        />
      </div>
      <footer>
        <small>Made with 🤍 by Min</small>
      </footer>
    </main>
  );
};

export default App;
