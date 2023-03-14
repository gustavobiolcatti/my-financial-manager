import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 350px;
`;

export const Title = styled.span`
  margin-bottom: 1em;
  
  text-align: center;
  font-size: 1.5em;
`;

export const Label = styled.label`
  font-size: .9em;
`;

export const ButtonContainer = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: center;

  grid-template-columns: 1fr 1fr;
  gap: 1em;

  margin-top: 2em;
`;
