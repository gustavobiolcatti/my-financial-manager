import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

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

export const Charts = styled.div`
  width: 100%;

  padding: 1em;

  border-radius: 10px;

  background: ${colors.white};

  box-shadow: 0 0 2px ${colors.gray};
`;
