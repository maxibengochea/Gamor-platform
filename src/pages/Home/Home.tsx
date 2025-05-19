import MainBoard from "./components/MainBoard/MainBoard";
import Categories from "./components/Categories/Categories";
import { useAuth } from "../../store/useAuth.store";
import "./Home.css";
import NavBarHeader from "./components/NavBarHeader/NavBarHeader";
import { useTheme } from "../../store/useTheme.store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type InlineStyles = {
  colorGamorHeading: string;
  colorButtonSwitchTheme: string;
  backgroundColorButtonSwitchTheme: string;
};

function Home() {
  const username = useAuth((state) => state.username); //obtener el nombre de usuario
  const isLogged = useAuth((state) => state.isLogged); //saber si el usuario esta logeado
  const isDarkTheme = useTheme((state) => state.isDarkTheme); //manejar el tema de fondo
  const updateIsDarkTheme = useTheme((state) => state.updateIsDarTheme);
  const navigate = useNavigate(); //obtener el objeto para navegar

  const inlineStyles: InlineStyles = {
    colorGamorHeading: isDarkTheme ? "white" : "black",
    colorButtonSwitchTheme: isDarkTheme ? "blueviolet" : "orange",
    backgroundColorButtonSwitchTheme: isDarkTheme ? "#212f3c" : "whitesmoke",
  };

  const handleClickSignIn = () => {
    //al hacer click, navegar hacia la pagina de autenticacion
    navigate("/authentication");
  };

  const handleClickSwitchTheme = () => {
    //si estamos en modo oscuro, removerlo
    if (isDarkTheme) {
      document.documentElement.classList.remove("dark-mode");
    }

    //si esta el modo claro, agregamos el oscuro
    else {
      document.documentElement.classList.add("dark-mode");
    }

    updateIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    let interval: number;

    if (!isLogged) {
      //si no esta logeado, enviar un mensaje cada 10 segundos
      interval = setInterval(() => {
        alert("To enjoy all the features, please sign in");
      }, 10000);
    }

    //dejar de enviar el mensaje cuando se destruya el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="general-container">
      {isLogged && (
        <button
          onClick={handleClickSwitchTheme}
          style={{
            color: inlineStyles.colorButtonSwitchTheme,
            borderColor: inlineStyles.colorButtonSwitchTheme,
            backgroundColor: inlineStyles.backgroundColorButtonSwitchTheme,
            position: "fixed",
          }}
        >{`set ${isDarkTheme ? "light" : "dark"} mode`}</button>
      )}
      <header className="header-home">
        <NavBarHeader items={["Home", "Streams", "Party", "Premium"]} />
        {username ? (
          <h1 style={{ color: inlineStyles.colorGamorHeading }}>
            Hi {username}!
          </h1>
        ) : (
          <h1 style={{ color: inlineStyles.colorGamorHeading }}>Gamor</h1>
        )}
        <div className="auth-manager">
          <span className="container-button-sign-in">
            <span className="button button-sign-in" onClick={handleClickSignIn}>
              Sign In
            </span>
          </span>
          <span
            className="button"
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderRadius: "15px",
              borderColor: "gray",
              padding: "8px 0",
              color: "white",
              backgroundColor: "black",
            }}
          >
            Create Account
          </span>
        </div>
      </header>
      <main>
        <MainBoard />
        <Categories />
      </main>
    </section>
  );
}

export default Home;
