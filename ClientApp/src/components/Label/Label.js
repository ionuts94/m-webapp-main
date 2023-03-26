import React from 'react';
import './Label.css';

const STATES = {
  active: {
    textColor: 'rgb(92,166,124)',
    backgroundColor: 'rgb(242, 255, 246)',
    borderColor: 'rgb(204,240,210)'
  },
  holiday: {
    textColor: 'rgb(242,191,140)',
    backgroundColor: 'rgb(254,253,245)',
    borderColor: 'rgb(253,247,232)'
  },
  fired: {
    textColor: 'rgb(247, 141, 117)',
    backgroundColor: 'rgb(255, 223, 217)',
    borderColor: 'rgb(227, 165, 147)'
  }
}

export function Label({ state }) {
  return (
    <div
      className='label-container'
      style={{
        color: STATES[state].textColor,
        backgroundColor: STATES[state].backgroundColor,
        borderColor: STATES[state].borderColor
      }}
    >
      {state}
    </div>
  )
}
