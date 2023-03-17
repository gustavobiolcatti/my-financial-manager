import { useState } from 'react';

import { AccountsObject } from 'models/account';
import { CategoriesObject } from 'models/category';
import { Transation } from 'models/transation';

import ActionButton from 'components/atoms/ActionButton';
import TransationModal from 'components/atoms/TransationModal';
import DeleteTransationModal from 'components/atoms/DeleteTransationModal';
import ShowModal from 'components/molecules/Modal';

import { formatDateWithDateFns } from 'utils/formatDate';

import * as S from './styles';

type TransationsTableProps = {
  transationDate: Date | null;
  transations: Transation[];
  categories: CategoriesObject;
  accounts: AccountsObject;
};

const TransationsTable = ({
  transationDate,
  categories,
  accounts,
  transations,
}: TransationsTableProps): JSX.Element => {
  const [transationId, setTransationId] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (id: string, type: 'delete' | 'update') => {
    setModalType(type);
    setTransationId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <S.Table>
        <thead>
          <tr>
            <S.TableHeadColumn>data</S.TableHeadColumn>
            <S.TableHeadColumn>categoria</S.TableHeadColumn>
            <S.TableHeadColumn>descrição</S.TableHeadColumn>
            <S.TableHeadColumn>conta</S.TableHeadColumn>
            <S.TableHeadColumn>valor</S.TableHeadColumn>
            <S.TableHeadColumn>opções</S.TableHeadColumn>
          </tr>
        </thead>
        <tbody>
          {transations &&
            transations.map((transation) => (
              <tr key={transation.id}>
                <S.TableColumn>
                  {formatDateWithDateFns(transation.date, 'dd-MM-yyyy')}
                </S.TableColumn>
                <S.TableColumn
                  important
                  style={{
                    color: categories[transation.categoryId].color,
                  }}
                >
                  {categories[transation.categoryId].name}
                </S.TableColumn>
                <S.TableColumn>{transation.description || '-'}</S.TableColumn>
                <S.TableColumn>
                  {accounts[transation.accountId].name}
                </S.TableColumn>
                <S.TableColumn
                  important
                  isValue
                  negative={transation.type === 'EXPENSE'}
                >
                  R$ {transation.value}
                </S.TableColumn>
                <S.TableColumn>
                  <S.ActionButtonWrapper>
                    <ActionButton
                      actionType="update"
                      onClick={() => handleOpenModal(transation.id, 'update')}
                    />
                    <ActionButton
                      actionType="delete"
                      onClick={() => handleOpenModal(transation.id, 'delete')}
                    />
                  </S.ActionButtonWrapper>
                </S.TableColumn>
              </tr>
            ))}
        </tbody>
      </S.Table>

      {openModal && (
        <ShowModal showModal={openModal} closeModal={handleCloseModal}>
          {modalType === 'update' ? (
            <TransationModal
              id={transationId}
              transationDate={transationDate}
              modalType="update"
              closeModal={handleCloseModal}
            />
          ) : (
            <DeleteTransationModal
              id={transationId}
              transationDate={transationDate}
              closeModal={handleCloseModal}
            />
          )}
        </ShowModal>
      )}
    </>
  );
};

export default TransationsTable;
