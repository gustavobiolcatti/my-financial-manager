import styled, { css } from "styled-components";

import colors from "assets/colors";

import { BoxTitleProps, ResumeProps } from "./types";

export const Container = styled.div<ResumeProps>`
  ${({fullSize}) => css`
    display: flex;
    flex-direction: column;
    justify-content: ${fullSize ? 'space-between' : 'flex-start'};

    gap: 24px;
    
    a {
      ${fullSize && 'height: 22%'}
    }

    @media (max-width: 768px) {
      margin-top: 2em;
    }
  `}
`

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  
  padding: .5em 1em;
  
  border-radius: 10px;
  
  background: ${colors.white};
  
  font-size: 2em;
  
  box-shadow: 0 0 2px ${colors.gray};

  @media (max-width: 1440px) {
    font-size: 1.6em;
  }
`;

export const BoxTitle = styled.span<BoxTitleProps>`
  ${({type}) => css`
    color: ${type === 'balance' 
      ? colors["light-blue"] : type === 'expense' 
      ? colors.red : colors.green};
    text-transform: capitalize;
    font-size: 1.2em;
    font-weight: 500;
  `}
`;

export const BoxValue = styled.span`

`