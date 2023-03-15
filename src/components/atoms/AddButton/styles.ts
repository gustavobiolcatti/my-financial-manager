import styled from 'styled-components';

import colors from 'assets/colors';

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  margin-left: 0.5em;

  border-radius: 5px;

  color: ${colors.purple};
  font-size: 3em;
  font-weight: 100;

  transition: 0.2s;

  :hover {
    transform: scale(0.95);
  }
`;
