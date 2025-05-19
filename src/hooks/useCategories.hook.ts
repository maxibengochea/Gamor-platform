import { useEffect, useState } from "react";
import { getCategories } from "../services/getCategories.service";
import type { Category } from "../types/game.type";

//hook para devolver las categorias una vez se renderiza el componente
function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  const handleCategories = async () => {
    const fetchedCategories = await getCategories(); //obtener las categorias
    setCategories(fetchedCategories); //actualizar el estado
  };

  useEffect(() => {
    handleCategories();
  }, []); //solo interesa obtenerlas al principio, por ello las dependencias vacias

  return { categories };
}

export default useCategories;
