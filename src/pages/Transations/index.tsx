import { useEffect, useState } from 'react';
import { uuidv4 } from '@firebase/util';
import { DatePicker, SelectPicker } from 'rsuite';

import useGetData from 'requests/queries/useGetData';

import { transationTypeEnumTranslate } from 'models/enums/transation-type-enum';
import { Transation } from 'models/transation';
import { CategoriesObject } from 'models/category';
import { AccountsObject } from 'models/account';

import EmptyBox from 'components/atoms/EmptyBox';
import AddButton from 'components/atoms/AddButton';
import TransationModal from 'components/atoms/TransationModal';
import TransationsTable from 'components/molecules/TransationsTable';
import ShowModal from 'components/molecules/Modal';
import TitleContainer from 'components/molecules/TitleContainer';

import { formatDateWithDateFns } from 'utils/formatDate';

import * as S from './styles';

const Transations = (): JSX.Element => {
  const [transationType, setTransationType] = useState<string | null>('ALL');
  const [transationDate, setTransationDate] = useState<Date | null>(new Date());

  const [transations, setTransations] = useState<Transation[] | null>(null);
  const [accounts, setAccounts] = useState<AccountsObject>({});
  const [categories, setCategories] = useState<CategoriesObject>({});

  const [openModal, setOpenModal] = useState(false);

  const { getData } = useGetData();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const transationSelectData = ['EXPENSE', 'INCOME', 'ALL'].map((item) => ({
    label: transationTypeEnumTranslate(item),
    value: item,
  }));

  const getTransations = (type: string | null): void => {
    if (!transationDate || !type) return;

    const formattedTransationDate = formatDateWithDateFns(
      transationDate,
      'MM-yyyy',
    );

    getData(`/transations/${formattedTransationDate}`, (snapshot) => {
      if (snapshot.exists()) {
        const data: Transation[] = Object.values(snapshot.val());

        if (type !== 'ALL') {
          const filteredTrasantions = data.filter(
            (transation) => transation?.type === type,
          );

          setTransations(filteredTrasantions);
          return;
        }

        setTransations(Object.values(snapshot.val()));
        return;
      }

      setTransations(null);
    });
  };

  const getAccounts = (): void => {
    getData('/accounts', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        setAccounts(data);
      }
    });
  };

  const getCategories = (): void => {
    getData('/categories', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const expenseCategories = data.expense;
        const incomeCategories = data.income;

        const allCategories = Object.assign(
          expenseCategories,
          incomeCategories,
        );

        setCategories(allCategories);
      }
    });
  };

  const canShowTransationsTable =
    transations?.length &&
    Object.keys(categories).length &&
    Object.keys(accounts).length;

  useEffect(() => {
    getTransations(transationType);
  }, [transationDate, transationType]);

  useEffect(() => {
    getCategories();
    getAccounts();
    getTransations(transationType);
  }, []);

  return (
    <>
      <TitleContainer title="transações">
        <AddButton onClick={handleOpenModal} />
      </TitleContainer>

      <S.Container>
        <S.FilterWrapper>
          <DatePicker
            format="yyyy-MM"
            placeholder="Mês"
            value={transationDate}
            onChange={(value) => setTransationDate(value)}
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

        {canShowTransationsTable ? (
          <TransationsTable
            transationDate={transationDate}
            accounts={accounts}
            categories={categories}
            transations={transations}
          />
        ) : (
          <EmptyBox />
        )}

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
