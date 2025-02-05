import React from "react";

export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  ref
}) {
  return (
    <div className="input-block">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        ref={ref}
      />
      {error && <p>{error}</p>}
    </div>
  );
}
