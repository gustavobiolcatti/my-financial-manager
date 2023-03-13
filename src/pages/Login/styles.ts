import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  /* background: ${colors.blue}; */
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  max-width: 50%;
`;

export const Image = styled.img`
  width: 75px;
  height: 75px;

  margin-bottom: 0em;
`;

export const LogoTitle = styled.h1`
  margin-bottom: 1em
`;