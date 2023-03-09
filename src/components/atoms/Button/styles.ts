import styled, { css } from "styled-components";

import colors from "assets/colors";

import { ButtonProps } from "./types";

export const Button = styled.button<ButtonProps>`
  ${({ secondary }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1em;

    border: none;
    border-radius: 10px;

    background: ${colors.white};

    color: ${colors.black};

    box-shadow: 0 0 5px 0px ${colors.gray};

    transition: 0.2s;

    cursor: pointer;

    svg {
      margin-right: 1em;
    }

    :active {
      transform: scale(0.95);
    }
  `}
`;
