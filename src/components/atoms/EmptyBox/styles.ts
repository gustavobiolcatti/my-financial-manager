import colors from 'assets/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  grid-column: span 2;

  padding: 2em;

  border-radius: 10px;

  background: ${colors.white};
`;

export const Message = styled.p``;
