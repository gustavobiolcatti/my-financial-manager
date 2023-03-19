import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 1em 1em 4em 1em;

  border-radius: 10px;

  background: ${colors.white};

  box-shadow: 0 0 2px ${colors.gray};

  @media (max-width: 768px) {
    margin-top: 2em;

    min-height: 200px;
  }
`;

export const Title = styled.p`
  margin-bottom: 1em;

  font-size: 1.5em;
`;
