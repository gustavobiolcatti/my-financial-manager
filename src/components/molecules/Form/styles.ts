import styled from 'styled-components';

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 16px;

  width: 350px;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const Title = styled.span`
  grid-column: span 2;

  text-align: center;
  font-size: 1.5em;
`;
