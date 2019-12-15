import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <FontAwesomeIcon icon={['fas', 'info-circle']} /> {alert.message}
      </div>
    )
  );
};

export default Alert;
