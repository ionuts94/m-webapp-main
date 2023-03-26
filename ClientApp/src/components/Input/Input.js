import React from 'react';
import { v4 as uuid } from 'uuid';
import './Input.css';

export function Input({
  id = uuid(),
  onChange = () => null,
  name = "default_input_name",
  value,
  type = "text",
  placeholder = "",
  label = "",
  as = "input",
  children,
  ...rest
}) {
  const Componet = as;

  return (
    <div className="input-container">
      <label
        className='input-label'
        htmlFor={id}
      >
        {label}
      </label>
      <Componet
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      >
        {children}
      </Componet>
    </div>
  )
}
