import styled from 'styled-components';

export const Title = styled.span`
  width: 100%;
  font-size: 1.5em;
`;

export const ButtonContainer = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: center;

  grid-template-columns: 1fr 1fr;
  gap: 1em;

  margin-top: 2em;
`;
