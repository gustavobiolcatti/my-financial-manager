import styled from 'styled-components';

import colors from 'assets/colors';

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0 1em;

  transition: 0.2s;

  a,
  button {
    width: 100%;
  }

  :last-child {
    margin-top: auto;
  }

  ::after {
    content: '';

    height: 100%;

    transition: 0.2s;
  }
`;

export const LinkText = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  padding: 0.5em 0.75em;

  border-radius: 10px;

  color: ${colors.gray};
  text-align: left;

  transition: 0.2s;

  svg {
    margin-right: 1em;
  }

  :hover {
    color: ${colors.white};
    background: ${colors['dark-gray']};
  }
`;
