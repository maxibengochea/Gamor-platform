import { useState } from "react";
import "./NavBarHeader.css";

type Props = {
  items: string[];
};

function NavBarHeader({ items }: Props) {
  //manejar los estilos del elemento seleccionado de la barra de navegacion
  const [selectedItem, setSelectedItme] = useState<number>(0);

  const handleClick = (itemNumber: number) => {
    //setear el id del elemento eleccionado
    setSelectedItme(itemNumber);
  };

  return (
    <nav>
      {items.map((item, index) => {
        return (
          <span
            key={index}
            onClick={() => handleClick(index)}
            className={`button nav-item ${
              index === selectedItem ? "nav-item-selected" : ""
            }`}
          >
            {item}
          </span>
        );
      })}
    </nav>
  );
}

export default NavBarHeader;
