export type CategoriesObject = {
  [key: string]: Category;
};

export type CategoryTypes = {
  expense: Category[];
  income: Category[];
};

export type Category = {
  id: string;
  name: string;
  color: string;
  active: boolean;
};
