import styled from 'styled-components';

import colors from 'assets/colors';

export const Box = styled.div`
  position: absolute;

  width: fit-content;

  padding: 2em;

  top: 50%;
  left: 50%;

  border-radius: 10px;

  transform: translate(-50%, -50%);
  background: ${colors.white};

  box-shadow: 0 0 24px ${colors.black};

  @media (max-width: 425px) {
    width: 95%;

    padding: 2em 1em;
  }
`;
