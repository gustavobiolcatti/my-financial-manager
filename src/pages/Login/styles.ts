import styled from "styled-components";

import colors from "assets/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

export const Button = styled.button`
  padding: 1em;

  border: none;

  background: ${colors.black};

  color: ${colors.white};

  cursor: pointer;
`;