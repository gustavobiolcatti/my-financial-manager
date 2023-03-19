import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 64px;

  padding: 1em 0;

  @media (max-width: 1024px) {
    gap: 32px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Charts = styled.div`
  padding: 1em;

  border-radius: 10px;

  background: ${colors.white};

  box-shadow: 0 0 2px ${colors.gray};
`;
