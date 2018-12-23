import styled, { keyframes } from 'styled-components';

const border = keyframes`
  0% {
    border: 1px solid white;
  }

  50% {
    border: 1px solid red;
  }
`;

export default  styled.div`
  border: 1px solid white;
  animation-name: ${border};
  animation-duration: 1s;
  animation-delay: 0s;
`
