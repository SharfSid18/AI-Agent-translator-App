import React from 'react';
export const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 rounded-lg border border-gray-300 ${className}`}
    {...props}
  />
);
export default Input;
