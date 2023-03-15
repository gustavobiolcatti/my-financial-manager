import TitleContainer from 'components/molecules/TitleContainer';
import { Category } from 'models/category';

const Categories = (): JSX.Element => {
  const expenseCategoriesMock: Category[] = [
    {
      name: 'food',
      color: '#000',
    },
    {
      name: 'education',
      color: '#000',
    },
    {
      name: 'home',
      color: '#000',
    },
    {
      name: 'health',
      color: '#000',
    },
    {
      name: 'gift',
      color: '#000',
    },
    {
      name: 'shopping',
      color: '#000',
    },
    {
      name: 'leisure',
      color: '#000',
    },
  ];

  return (
    <>
      <TitleContainer title="categorias" />
    </>
  );
};

export default Categories;
