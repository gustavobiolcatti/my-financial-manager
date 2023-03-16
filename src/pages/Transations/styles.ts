import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 64px;

  padding: 1em 0;
`;

export const Wrapper = styled.div`
  grid-column: span 2;
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 2em;
`;

export const Charts = styled.div`
  padding: 1em;

  border-radius: 10px;

  background: ${colors.white};
`;
