import React from 'react';
export const Button = ({ children, className = '', variant = 'solid', ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg border ${variant==='outline'?'bg-white/60 border-gray-300':'bg-black text-white border-transparent'} ${className}`}
    {...props}
  >
    {children}
  </button>
);
export default Button;
