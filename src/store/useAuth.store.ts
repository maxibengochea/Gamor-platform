import { create } from "zustand";

type State = {
  isLogged: boolean;
  username: string | null;
  updateUsername(newUsername: string | null): void;
  updateAuth(newState: boolean): void;
};

//estado global para saber si un usuario esta autenticado
export const useAuth = create<State>((set) => ({
  isLogged: false,
  username: null,
  updateAuth: (newState: boolean) => set({ isLogged: newState }),
  updateUsername: (newUsername: string) => set({ username: newUsername }),
}));
