import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  column-gap: 64px;

  row-gap: 24px;

  padding: 1em 0;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 425px) {
    overflow-x: scroll;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  grid-column: span 3;
`;
