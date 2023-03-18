import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  min-height: 350px;

  padding: 1em 1em 3em 1em;

  border-radius: 10px;

  background: ${colors.white};

  box-shadow: 0 0 2px ${colors.gray};
`;

export const Title = styled.p`
  margin-bottom: 0.5em;

  font-size: 1.5em;
`;
