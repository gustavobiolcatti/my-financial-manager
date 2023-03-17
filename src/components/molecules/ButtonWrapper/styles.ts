import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: center;

  grid-template-columns: 1fr 1fr;
  grid-column: span 2;
  gap: 1em;

  margin-top: 2em;
`;
