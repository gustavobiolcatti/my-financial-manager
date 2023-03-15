import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 1em 0;

  width: 250px;
  height: 100%;

  left: 300px;

  background: ${colors.black};

  box-shadow: 0 0 30px 5px ${colors.gray};

  z-index: 1;

  a,
  button {
    display: flex;
    align-items: center;

    width: 100%;

    padding: 0 1em;

    margin-bottom: 1em;

    transition: 0.2s;

    :last-child {
      margin-bottom: 0;
    }

    ::after {
      content: '';

      height: 100%;

      border-radius: 10px 0 0 10px;

      transition: 0.2s;
    }
  }

  .sellected-page {
    padding-right: 0;

    span {
      color: ${colors.purple};
    }

    ::after {
      margin-left: 1em;
      border-left: 5px solid ${colors.purple};
    }
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

  cursor: pointer;

  svg {
    margin-right: 1em;
  }

  :hover {
    color: ${colors.white};
    background: ${colors['dark-gray']};
  }
`;

export const Button = styled.button`
  margin-top: auto;
`;
