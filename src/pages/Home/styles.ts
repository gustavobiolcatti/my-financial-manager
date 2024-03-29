import styled from 'styled-components';

import colors from 'assets/colors';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 7em 2em 7em;

  background-color: ${colors['light-gray']};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='p' width='100' height='100' patternUnits='userSpaceOnUse' patternTransform='scale(0.05)'%3E%3Cg id='a' data-color='fill' fill='%23FFF'%3E%3Cpath d='M50-50h100V50H50z'%3E%3C/path%3E%3Cpath opacity='.5' d='M-50-50V50H50v100h100V-50z'%3E%3C/path%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23p)' width='100%25' height='100%25'%3E%3C/rect%3E%3C/svg%3E");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  overflow-y: scroll;

  @media (max-width: 1440px) {
    padding: 0 3em 2em 3em;
  }

  @media (min-width: 1440px) {
    width: calc(100% - 250px);

    margin-left: 250px;
  }

  @media (max-width: 375px) {
    padding: 0 1em 2em 1em;
  }
`;
