import React from 'react';
import ErrorButton from '../error-button';
import './row.css';
const Row = ({ left, right }) => {
  return (
    <div className="row mb2">
      <div className="col-md-6">{left}</div>
      <div className="col-md-6">
        {right}
        <ErrorButton />
      </div>
    </div>
  );
};
export default Row;
