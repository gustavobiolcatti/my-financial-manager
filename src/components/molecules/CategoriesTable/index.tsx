import { Category } from 'models/category';

import ActionButton from 'components/atoms/ActionButton';

import * as S from './styles';

type CategoriesTableProps = {
  categories: Category[];
};
const CategoriesTable = ({ categories }: CategoriesTableProps): JSX.Element => {
  return (
    <S.Table>
      <thead>
        <tr>
          <S.TableHeadColumn>nome</S.TableHeadColumn>
          <S.TableHeadColumn>cor</S.TableHeadColumn>
          <S.TableHeadColumn>opções</S.TableHeadColumn>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <S.TableColumn>{category.name}</S.TableColumn>
            <S.TableColumn>
              <S.CategoryColor color={category.color} />
            </S.TableColumn>
            <S.TableColumn>
              <S.ActionButtonWrapper>
                <ActionButton actionType="update" onClick={() => {}} />
                <ActionButton actionType="delete" onClick={() => {}} />
              </S.ActionButtonWrapper>
            </S.TableColumn>
          </tr>
        ))}
      </tbody>
    </S.Table>
  );
};

export default CategoriesTable;
