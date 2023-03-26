import React from 'react'
import './PageWrapper.css';

export function PageWrapper({ children }) {
  return (
    <div className='page-wrapper'>
      {children}
    </div>
  )
}
