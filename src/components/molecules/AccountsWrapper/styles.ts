import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 16px;

  grid-column: span 2;

  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
  }
`;
