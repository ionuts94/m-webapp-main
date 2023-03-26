import React from 'react';
import './PageHeader.css';

export function PageHeader({ children, color, textColor }) {
  return (
    <div style={{ backgroundColor: color }} className='page-header-container'>
      <h1 style={{ color: textColor }} className='page-header-text'>{children}</h1>
    </div>
  )
}

export default PageHeader