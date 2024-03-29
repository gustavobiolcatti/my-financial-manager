import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 40px;

  padding: 1em 0;

  @media (max-width: 768px) {
    display: initial;
  }
`;

export const FilterWrapper = styled.div`
  grid-column: span 2;
`;
