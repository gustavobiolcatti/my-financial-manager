import styled from 'styled-components';

import colors from 'assets/colors';

export const Container = styled.div`
  height: 50vh;

  border-radius: 10px;

  background: ${colors.white};

  box-shadow: 0 0 2px ${colors.gray};

  @media (max-width: 425px) {
    height: 60vh;
  }
`;
