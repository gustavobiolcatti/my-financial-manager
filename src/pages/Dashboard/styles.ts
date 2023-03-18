import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 40px;

  padding: 1em 0;
`;

export const FilterWrapper = styled.div`
  grid-column: span 4;
`;
