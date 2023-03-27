import React from 'react';
import { DEFAULT_PROFILE_PICTURE } from 'constants';
import './Avatar.css';

export function Avatar({ name, photoUrl }) {
  return (
    <div className='avatar-container'>
      <img
        src={photoUrl || DEFAULT_PROFILE_PICTURE}
        alt="default-avatar"
        style={{ height: 40, width: 40, borderRadius: '50%' }}
      />
      {name}
    </div>
  )
}
