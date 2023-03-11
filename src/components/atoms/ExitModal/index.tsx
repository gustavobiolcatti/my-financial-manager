import { useAuth } from 'contexts/AuthContext';

import Button from 'components/atoms/Button';

import * as S from './styles';

type ExitModalProps = {
  closeModal: () => void;
};

const ExitModal = ({ closeModal }: ExitModalProps): JSX.Element => {
  const { logout } = useAuth();

  return (
    <>
      <S.Title id="modal-title">Deseja mesmo sair?</S.Title>
      <S.ButtonContainer>
        <Button onClick={logout} alert>
          Sim
        </Button>
        <Button onClick={closeModal}>Não</Button>
      </S.ButtonContainer>
    </>
  );
};

export default ExitModal;
