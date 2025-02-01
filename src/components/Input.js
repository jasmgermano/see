import React from 'react'

export default function Input({ label, type, name, value, onChange, onBlur, error, placeholder }) {
  return (
    <div className='input-block'>
      {/* <label htmlFor={name}>{label}</label> */}
      <input 
        type={type} 
        id={name} 
        name={name} 
        value={value} 
        onChange={onChange} 
        onBlur={onBlur} 
        placeholder={placeholder}
      />
      {error && <p>{error}</p>}
    </div>
  )
}
