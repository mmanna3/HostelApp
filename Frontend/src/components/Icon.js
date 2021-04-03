import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icon = ({ faCode, size = '' }) => (
  <span className="icon">
    <FontAwesomeIcon icon={faCode} size={size} />
  </span>
);
