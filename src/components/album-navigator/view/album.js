import React from 'react';
import styled from 'styled-components';
import meanBy from 'lodash/meanBy';

import Rating from './rating';

const Container = styled.div`
  border: 1px solid #ddd;
  width: 300px;
  margin-bottom: 5px;
`;

export default ({ id, title, artist, reviews, onClick }) =>  (
  <Container onClick={() => onClick({ albumId: id })}>
    <div>{title}</div>
    <div>{artist}</div>
    <Rating rating={meanBy(Object.values(reviews), review => review.rating)} />
  </Container>
);

