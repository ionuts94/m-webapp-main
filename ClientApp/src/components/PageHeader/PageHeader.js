import React from 'react';
import { Back } from 'components';
import './PageHeader.css';

export function PageHeader({ children, color, textColor, backTo }) {
  return (
    <div
      className='page-header-container'
      style={{ backgroundColor: color }}
    >
      {backTo &&
        <Back backTo={backTo} />
      }

      <h1
        style={{ color: textColor }}
        className='page-header-text'
      >
        {children}
      </h1>

    </div>
  )
}

export default PageHeader