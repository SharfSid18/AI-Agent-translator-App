import React from 'react';
export const Textarea = ({ className = '', ...props }) => (
  <textarea
    className={`w-full px-3 py-2 rounded-lg border border-gray-300 ${className}`}
    {...props}
  />
);
export default Textarea;
