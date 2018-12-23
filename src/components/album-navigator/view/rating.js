import React from 'react';
import range from 'lodash/range';

export default ({ rating }) => range(rating).map((_, idx) => <span key={idx}>*</span>);
