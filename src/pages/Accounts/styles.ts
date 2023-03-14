import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 64px;

  padding: 1em 0;
`;

export const Accounts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 16px;

  grid-column: span 2;
`;

export const Charts = styled.div`
  padding: 1em;

  border-radius: 10px;

  background: ${colors.white};
`;
