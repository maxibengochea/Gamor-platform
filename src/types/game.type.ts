export type Category = {
  id: number;
  name: string;
};

export type Game = {
  id: number;
  name: string;
  category: Category;
  image: string;
};
