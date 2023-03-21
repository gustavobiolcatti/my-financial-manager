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
