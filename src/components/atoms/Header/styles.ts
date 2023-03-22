import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.header`
  display: flex;
  justify-content: flex-end;

  padding: 2em 1em;

  width: 100%;
`;

export const UserName = styled.span`
  color: ${colors.black};
  font-size: 1.5em;
  font-weight: 500;
`;
