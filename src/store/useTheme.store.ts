import { create } from "zustand";

type State = {
  isDarkTheme: boolean;
  updateIsDarTheme(newState: boolean): void;
};

//estado global para manejar el tema de fondo
export const useTheme = create<State>((set) => ({
  isDarkTheme: false,
  updateIsDarTheme: (newState: boolean) => set({ isDarkTheme: newState }),
}));
