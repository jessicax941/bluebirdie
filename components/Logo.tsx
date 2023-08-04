import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Logo() {
  return <div className="flex flex-row items-center space-x-4">
  <FontAwesomeIcon icon={faTwitter} className="h-10 text-blue-400" />
  <p className="text-xl font-bold tracking-wide">bluebirdie</p>
</div>;
}
