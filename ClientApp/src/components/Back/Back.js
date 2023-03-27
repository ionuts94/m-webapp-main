import React from 'react';
import { BiArrowBack } from "react-icons/bi";
import { Link } from 'react-router-dom';
import './Back.css';

export function Back({ backTo }) {
  return (
    <Link
      className='back-arrow-container'
      to={backTo}
    >
      <BiArrowBack />
    </Link>
  )
}
