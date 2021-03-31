import React from 'react';
import icon from './Death_Star.png';
import './error-indicator.css';
const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="death-star" width="130px" />
      <span className="boom">BOOM!</span>
      <span>something has gone terribly wrong</span>
      <span>(but we already send droids to fix it)</span>
    </div>
  );
};
export default ErrorIndicator;
