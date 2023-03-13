import styled from "styled-components";

import colors from "assets/colors";

import { InputProps } from "./types";

export const Input = styled.input<InputProps>`
  padding: 1em;
  margin-bottom: 1.5em;

  border-bottom: 1px solid ${colors.gray};
`;