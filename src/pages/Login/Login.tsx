import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth.store";
import { useState } from "react";
import "./Login.css";

function Login() {
  const updateAuth = useAuth((state) => state.updateAuth); //metodo para actualizar la autenticacion
  const updateUsername = useAuth((state) => state.updateUsername); //metodo para actualizar el nombre de usuario
  const navigate = useNavigate(); //componente para navegar
  const [username, setUsername] = useState<string | undefined>(undefined); //estado para manejar lo que captura del usuario

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //evitar recargar la pagina al hacer submit
    event.preventDefault();

    //si ingreso un nombre invalido devolver un alert
    if (
      username &&
      username !== "" &&
      (username!.trim().length > 10 || username!.trim().length < 3)
    ) {
      alert("Ingress a short game between 4 and 10 characters");
      return;
    }

    //si no ingreso nombre actualizar el username y la autenticacion ambos con null
    if (!username || username === "") {
      alert("'username' field is required")
      return
    } 
    
    //actualizar el nombre y la autenticacion
    else {
      updateAuth(true);
      updateUsername(username!);
    }

    //redireccionar al usuario a la home
    navigate("/");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const usernameValue = event.target.value; //capturar lo que escribe el usuario
    setUsername(usernameValue);
  };

  return (
    <section className="section-login">
      <form className="form-login" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="login-legend-fieldset">Welcome to Gamor</legend>
          <div>
            <input
              className="form-login-input"
              type="text"
              value={username}
              onChange={handleChange}
              placeholder="Ingress a short nickname..."
            />
          </div>
          <button className="form-login-button">sign in</button>
        </fieldset>
      </form>
    </section>
  );
}

export default Login;
