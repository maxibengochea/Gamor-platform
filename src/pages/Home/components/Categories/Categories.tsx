import useCategories from "../../../../hooks/useCategories.hook";
import "./Categories.css";
import { useState } from "react";
import { useTheme } from "../../../../store/useTheme.store";
import { useGames } from "../../../../store/useGames.store";

type InlineStyles = {
  colorHeadingCategories: string;
};

function Categories() {
  //metodo para actualizar los juegos por categoria
  const updateGamesByCategory = useGames(
    (state) => state.updateGamesByCategory
  );

  const { categories } = useCategories(); //obtener las categorias
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); //manejar cuando el usuario selecciona una categoria
  const isDarkTheme = useTheme((state) => state.isDarkTheme); //estado global para saber el tema de fondo

  const handleClick = (id: number) => {
    //si el usuario selecciono la misma categoria, le devolvemos sus estilos a los iniciales
    if (id === selectedCategory) {
      setSelectedCategory(null);
      updateGamesByCategory(null);
      return;
    }

    //si selleciono una nueva categoria actualizar la categoria global y la categoria seleccionada
    updateGamesByCategory(id);
    setSelectedCategory(id);
  };

  const inlineStyles: InlineStyles = {
    colorHeadingCategories: isDarkTheme ? "white" : "black",
  };

  return (
    <section className="categories-section">
      <h2 style={{ color: inlineStyles.colorHeadingCategories }}>
        Trending Categories
      </h2>
      <ul className="categories">
        {categories.map(({ name, id }, index) => (
          <li
            className={`category button ${
              selectedCategory === id ? "selected-category" : ""
            }`}
            key={id}
            onClick={() => handleClick(id)}
          >
            <span>{index + 1}.</span>
            <p>{name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Categories;
