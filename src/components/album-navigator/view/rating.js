import React from 'react';
import range from 'lodash/range';
import meanBy from 'lodash/meanBy';

export default ({ reviews }) => (
  <div>
    {
      range(meanBy(reviews, review => review.rating))
        .map((_, idx) => <span key={idx} role="img" aria-label="star">*</span>)
    }
    <span>({reviews && reviews.length})</span>
  </div>
)
