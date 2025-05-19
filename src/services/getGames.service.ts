import { games } from "../mocks/index";
import type { Game } from "../types/game.type";

export const getGamesByCategory = async (
  categoryId: number
): Promise<Game[]> => {
  //obtner los juegos dada la categoria
  const gamesByCategory = categoryId
    ? games.filter((game) => game.category.id == categoryId)
    : [];

  return gamesByCategory;
};

export const getGames = async () => {
  return games;
};
