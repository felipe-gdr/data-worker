import React from 'react';
import styled from 'styled-components';

import Rating from './rating';

const Container = styled.div`
  border: 1px solid #ddd;
  width: 300px;
  margin-bottom: 5px;
  cursor: pointer;
`;

export default ({ id, title, artist, reviews, onClick }) =>  (
  <Container onClick={() => onClick({ albumId: id })}>
    <div>{title}</div>
    <div>{artist}</div>
    <Rating reviews={reviews} />
  </Container>
);

