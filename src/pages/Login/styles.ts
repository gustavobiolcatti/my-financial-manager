import styled from 'styled-components';

import GoogleIco from 'assets/img/google.svg';
import colors from 'assets/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: ${colors['light-gray']};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='p' width='100' height='100' patternUnits='userSpaceOnUse' patternTransform='scale(0.05)'%3E%3Cg id='a' data-color='fill' fill='%23FFF'%3E%3Cpath d='M50-50h100V50H50z'%3E%3C/path%3E%3Cpath opacity='.5' d='M-50-50V50H50v100h100V-50z'%3E%3C/path%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23p)' width='100%25' height='100%25'%3E%3C/rect%3E%3C/svg%3E");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  max-width: 50%;

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 425px) {
    padding: 1em;
  }
`;

export const Image = styled.img`
  width: 5em;
  height: 5em;

  margin-bottom: 0em;
`;

export const LogoTitle = styled.h1`
  margin-bottom: 1em;

  @media (max-width: 425px) {
    font-size: 2em;
  }
`;

export const GoogleIcon = styled.i`
  width: 2.3em;
  height: 2.3em;

  margin-right: 1em;

  background: url(${GoogleIco}) no-repeat center;
`;
