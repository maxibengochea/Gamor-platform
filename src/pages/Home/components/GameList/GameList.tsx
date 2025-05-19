import { useEffect, useRef, useState } from "react";
import type { FortnitePromoImg } from "../../../../types/fornite-promo-img.type";
import NavBarHeader from "../NavBarHeader/NavBarHeader";
import "./GameList.css";
import { useTheme } from "../../../../store/useTheme.store";
import type { Game } from "../../../../types/game.type";
import { useGames } from "../../../../store/useGames.store";
import { getGames } from "../../../../services/getGames.service";
import { useAuth } from "../../../../store/useAuth.store";

type PropsGameList = {
  updateGameImage(gameImage: FortnitePromoImg): void;
};

type PropsGame = {
  id: number;
  index: number;
  name: string;
  image: string;
  updateGameImage(gameImage: FortnitePromoImg): void;
};

type InlineStyles = {
  backgroundColorIndexGame?: string;
  colorIndexGame?: string;
  backgroundColorButtonAddGame?: string;
  colorButtonAddGame?: string;
  colorHeaderGameList?: string;
};

function GameList({ updateGameImage }: PropsGameList) {
  const games = useGames((state) => state.games); //obtener los juegos a renderizar
  const lastSearchedGames = useGames((state) => state.lastSearchedGames); //obtener la ultima busqueda que no es por nombre
  const updateGamesByName = useGames((state) => state.updateGamesByName); //obtener el metodo para actualizar por nombre
  const updateGames = useGames((state) => state.updateGames); //funcion para actualizar el estado
  const [addedGame, setAddedGame] = useState<string>(""); //estado para manejar cuando el usuario agrega un juego
  const isDarkTheme = useTheme((state) => state.isDarkTheme); //estado global para manejar el tema de fondo
  const isLogged = useAuth((state) => state.isLogged); //saber si el usuario esta logeado

  const inlineStyles: InlineStyles = {
    colorHeaderGameList: isDarkTheme ? "white" : "black",
  };

  const updateInitialGames = async () => {
    const fetchedGames = await getGames(); //inicialmente tomar todos los juegos
    updateGames(fetchedGames);
  };

  useEffect(() => {
    //renderizar todos los juegos cada vez que inicie el componente
    if (!lastSearchedGames.length) {
      updateInitialGames();
    }
  }, [lastSearchedGames]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddedGame(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //no recargar la pagina luego del submit
    updateGamesByName(addedGame); //filtrar los juegos por nombre
    setAddedGame(""); //resetear los juegos agregados
  };

  return (
    <article className="game-list-container">
      <header className="game-list-header">
        <h2
          style={{
            color: inlineStyles.colorHeaderGameList,
            alignSelf: "flex-start",
          }}
        >
          01. Chosen Platform
        </h2>
        <NavBarHeader items={["Party", "Matchs", "Streams"]} />
      </header>
      <form className="game-list" onSubmit={handleSubmit}>
        <h2
          style={{
            color: inlineStyles.colorHeaderGameList,
            alignSelf: "flex-start",
          }}
        >
          02. Searching Games
        </h2>
        <input
          value={addedGame}
          placeholder="search game..."
          onChange={handleChange}
        />
        <ol className="games" style={{ overflow: "auto" }}>
          {(isLogged ? games : []).map(({ id, name, image }, index) => (
            <li className="game-container" key={id}>
              <Game
                id={id}
                name={name}
                index={index}
                image={image}
                updateGameImage={updateGameImage}
              />
            </li>
          ))}
        </ol>
        <button type="submit" className="game-list-button-submit">
          Search Now
        </button>
      </form>
    </article>
  );
}

function Game({ name, image, index, updateGameImage }: PropsGame) {
  const games = useGames((state) => state.games); //obtener los juegos para saber si cambiaron
  const pRef = useRef<HTMLParagraphElement>(null); //fijar el p para obtener el height y asignarselo al boton de agregar
  const isDarkTheme = useTheme((state) => state.isDarkTheme);

  //manejar la altura del boton de agregar
  const [buttonHeight, setButtonHeight] = useState<number | undefined>(
    undefined
  );

  const handleClick = (imgUrl: string) => {
    //crear la imagen de background
    const gameImg: FortnitePromoImg = {
      src: imgUrl,
      height: "100%",
      width: "100%",
      objectFict: "cover",
      zIndex: "1",
    };

    //setear la imagen
    updateGameImage(gameImg);
  };

  useEffect(() => {
    if (pRef.current) {
      setButtonHeight(pRef.current.clientHeight);
    }
  }, [games]);

  const inlineStyles: InlineStyles = {
    backgroundColorIndexGame: isDarkTheme ? "black" : "gainsboro",
    colorIndexGame: isDarkTheme ? "white" : "black",
    backgroundColorButtonAddGame: isDarkTheme ? "#424949" : "gainsboro",
    colorButtonAddGame: isDarkTheme ? "white" : "black",
  };

  return (
    <>
      <p className="game-name" ref={pRef}>
        <span
          style={{
            borderRadius: "100%",
            borderWidth: "1px",
            borderStyle: "solid",
            padding: "0 3px",
            backgroundColor: inlineStyles.backgroundColorIndexGame,
            border: "none",
            color: inlineStyles.colorIndexGame,
          }}
        >
          {index + 1}
        </span>{" "}
        {name}
      </p>
      <button
        onClick={() => handleClick(image)}
        style={{
          backgroundColor: inlineStyles.backgroundColorButtonAddGame,
          border: "none",
          height: buttonHeight,
          color: inlineStyles.colorButtonAddGame,
        }}
      >
        +
      </button>
    </>
  );
}

export default GameList;
