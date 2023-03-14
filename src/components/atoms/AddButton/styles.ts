import styled from 'styled-components';

import colors from 'assets/colors';

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 0.5em;

  border-radius: 50%;

  color: ${colors.purple};
  font-size: 3em;

  transition: 0.2s;

  :hover {
    transform: scale(0.95);
  }
`;
