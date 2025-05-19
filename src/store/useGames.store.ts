import type { Game } from "../types/game.type";
import { create } from "zustand";

type State = {
  initialGames: Game[];
  lastSearchedGames: Game[];
  games: Game[];
  updateGamesByName(name: string): void;
  updateGamesByCategory(categoryId: number | null): void;
  updateGames(games: Game[]): void;
};

const gamesByCategory = (
  categoryId: number | null,
  initialGames: Game[]
): Partial<State> => {
  //si no hay categoria, devolver todos los juegos
  if (!categoryId) {
    return { games: initialGames };
  }

  //devolver los juegos por categoria
  const filteredGames = initialGames.filter(
    (game) => game.category.id === categoryId
  );

  //devolver los juegos filtrados y actualizar la ultima busqueda
  return { games: filteredGames, lastSearchedGames: filteredGames };
};

const gamesByName = (
  name: string,
  lastSearchedGames: Game[]
): Partial<State> => {
  //devolver los juegos que contengan el nombre
  const filteredGames = lastSearchedGames.filter((game) =>
    game.name.toLowerCase().includes(name.toLowerCase().trim())
  );

  //actualizamos solo los juegos para filtrar sobre la ultima busqueda
  return { games: filteredGames };
};

//estado global para manejar los juegos con sus filtros
export const useGames = create<State>((set, get) => {
  return {
    games: [],
    initialGames: [],
    lastSearchedGames: [],
    updateGamesByCategory: (categoryId: number | null) => {
      //obtener los juegos por categoria y actualizar la ultima busqueda
      const props = gamesByCategory(categoryId, get().initialGames);

      set({
        games: props.games,
        //si la ultima busqueda vino vacia, significa que el usuario desmarco
        //por lo tanto actualizamos la ultima busqueda con los juegos iniciales
        lastSearchedGames: props.lastSearchedGames ?? get().initialGames, 
      });
    },
    updateGamesByName: (name: string) => {
      const props = gamesByName(name, get().lastSearchedGames); //obtener los jur=egos filtrados por nombre
      set({ games: props.games });
    },
    updateGames: (initialGames: Game[]) =>
      set({ games: initialGames, initialGames }),
  };
});
