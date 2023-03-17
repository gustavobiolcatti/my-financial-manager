import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  column-gap: 64px;

  padding: 1em 0;
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  grid-column: span 3;

  margin-bottom: 2em;
`;

export const Charts = styled.div`
  padding: 1em;

  border-radius: 10px;

  background: ${colors.white};

  box-shadow: 0 0 2px ${colors.gray};
`;
