import { createGlobalStyle, css } from "styled-components";

export const globalBodyStyle = css`
  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
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
    /* font-family: 'Pokemon Fire Red', sans-serif; */
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
`;

export const GlobalStyle = createGlobalStyle`
  ${globalBodyStyle}
`;
