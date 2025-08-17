import React from 'react';
export const Card = ({ className = '', children, ...props }) => (
  <div className={`rounded-2xl bg-white/80 backdrop-blur border ${className}`} {...props}>
    {children}
  </div>
);
export default Card;
