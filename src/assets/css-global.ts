import { createGlobalStyle, css } from 'styled-components';

import colors from './colors';

export const globalBodyStyle = css`
  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;

    border: none;

    background: none;

    outline: none;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  html,
  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  body {
    overflow: hidden;
    
    font-family: 'Poppins', sans-serif;

    color: ${colors.black};

    background: ${colors.white};
  }

  html,
  body,
  #root {
    width: 100vw;
    height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-size: 1em;
    cursor: pointer;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${globalBodyStyle}
`;
