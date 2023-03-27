import React from 'react';
import './Tile.css';

export function Tile({ header, subHeader, icon, onClick }) {
  return (
    <button onClick={onClick} className='tile'>
      <h1>{header}</h1>
      {icon}
      <span>{subHeader}</span>
    </button>
  )
}
