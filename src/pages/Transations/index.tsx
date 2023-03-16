import { useState } from 'react';
import { uuidv4 } from '@firebase/util';
import { DatePicker, SelectPicker } from 'rsuite';

import { transationTypeEnumTranslate } from 'models/enums/transation-type-enum';
import { Transation } from 'models/transation';

import EmptyBox from 'components/atoms/EmptyBox';
import AddButton from 'components/atoms/AddButton';
import TransationModal from 'components/atoms/TransationModal';
import TransationsTable from 'components/molecules/TransationsTable';
import ShowModal from 'components/molecules/Modal';
import TitleContainer from 'components/molecules/TitleContainer';

import * as S from './styles';

const Transations = (): JSX.Element => {
  const [transations, setTransations] = useState<Transation[] | null>(null);
  const [transationType, setTransationType] = useState<string | null>(
    'EXPENSE',
  );
  const [transationData, setTransationData] = useState<Date | null>(new Date());

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const transationSelectData = ['EXPENSE', 'INCOME'].map((item) => ({
    label: transationTypeEnumTranslate(item),
    value: item,
  }));

  return (
    <>
      <TitleContainer title="transações">
        <AddButton onClick={handleOpenModal} />
      </TitleContainer>

      <S.Container>
        <S.Wrapper>
          <S.FilterWrapper>
            <DatePicker
              format="yyyy-MM"
              placeholder="Mês"
              value={transationData}
              onChange={(value) => setTransationData(value)}
              cleanable={false}
              style={{ width: 200 }}
            />
            <SelectPicker
              data={transationSelectData}
              value={transationType}
              onChange={(value) => setTransationType(value)}
              style={{ width: '200px', marginLeft: '1em' }}
              searchable={false}
              cleanable={false}
            />
          </S.FilterWrapper>
          {transations ? (
            <TransationsTable transations={transations} />
          ) : (
            <EmptyBox />
          )}
        </S.Wrapper>
        <S.Charts>Gráficos</S.Charts>

        {openModal && (
          <ShowModal showModal={openModal} closeModal={handleCloseModal}>
            <TransationModal
              id={uuidv4()}
              modalType="create"
              closeModal={handleCloseModal}
            />
          </ShowModal>
        )}
      </S.Container>
    </>
  );
};

export default Transations;
