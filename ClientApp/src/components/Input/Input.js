import React from 'react';
import { v4 as uuid } from 'uuid';
import './Input.css';

// Polymorph component
// It groups a label with any type of inputs
// Mostly used as input and select
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
  required,
  ...rest
}) {
  const Componet = as;

  return (
    <div className="input-container">
      <label
        className='input-label'
        htmlFor={id}
      >
        {label}{required && <span> *</span>}
      </label>
      <Componet
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        {...rest}
      >
        {children}
      </Componet>
    </div>
  )
}
