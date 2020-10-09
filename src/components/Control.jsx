import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Control = ({ mode, length, onDecrement, onIncrement, isRunning }) => (
  <section id={`${mode}-label`}>
    <h3>{`${mode} Length`}</h3>
    <div className='setting align-row'>
      <button
        id={`${mode}-decrement`}
        className='setting-button align-row'
        onClick={onDecrement}
        disabled={length <= 1 || isRunning}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <p id={`${mode}-length`}>{length}</p>
      <button
        id={`${mode}-increment`}
        className='setting-button align-row'
        onClick={onIncrement}
        disabled={length >= 60 || isRunning}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  </section>
);

export default Control;
