import { games } from "../mocks";
import type { Category } from "../types/game.type";

export const getCategories = async (): Promise<Category[]> => {
  const categories: Category[] = games.map((game) => game.category); //obtener todas las categorias
  const uniqueCategories = removeDuplicate(categories); //eliminar las categorias repetidas
  return uniqueCategories;
};

const removeDuplicate = (categories: Category[]) => {
  const buffer: Category[] = [];

  categories.forEach((cat) => {
    if (!buffer.some(({ id }) => cat.id === id)) {
      buffer.push(cat);
    }
  });

  return buffer;
};
