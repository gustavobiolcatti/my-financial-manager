import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 300px;
  height: 100%;

  left: 300px;

  background: ${colors.gray};

  a {
    display: flex;
    padding: 1em;
    align-items: center;
    font-size: 1.5em;
  }
`;

export const NavLink = styled.span`
  width: 100%;

  cursor: pointer;
`;
