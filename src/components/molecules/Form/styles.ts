import styled from 'styled-components';

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 16px;

  width: 350px;
`;

export const Title = styled.span`
  grid-column: span 2;

  text-align: center;
  font-size: 1.5em;
`;
