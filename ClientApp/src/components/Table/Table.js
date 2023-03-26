import React from 'react';
import './Table.css';

export function Table({ children }) {
  return (
    <div className='table-container'>
      {children}
    </div>
  )
}

function Head({ children }) {
  return (
    <div className='table-head'>
      {children}
    </div>
  )
}

function Header({ children, hideOnMobile }) {
  return (
    <div className={`table-header ${hideOnMobile && 'hideOnMobile'}`}>
      {children}
    </div>
  )
}

function Body({ children }) {
  return (
    <div className='table-body'>
      {children}
    </div>
  )
}

function Row({ children }) {
  return (
    <div className='table-row'>
      {children}
    </div>
  )
}

function Data({ children, hideOnMobile }) {
  return (
    <div className={`table-data ${hideOnMobile && 'hideOnMobile'}`}>
      {children}
    </div>
  )
}

Table.Head = Head;
Table.Row = Row;
Table.Body = Body;
Table.Header = Header;
Table.Data = Data;

