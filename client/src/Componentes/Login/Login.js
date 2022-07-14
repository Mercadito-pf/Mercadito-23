import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Alerta from "../Alerta/Alerta";
import LayoutAuth from "../Layout/LayoutAuth";
import Spinner from "../Spinner/Spinner";

const Login = () => {
  const navigate = useHistory();

  const [cargando, setCargando] = useState(false);
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const [alerta, setAlerta] = useState({ msg: "", categoria: "" });

  const { email, password } = usuario;

  //const { setToken } = useContext(AuthContext);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if ([email, password].includes("")) {
        setAlerta({
          msg: "Todos los campos son obligatorios",
          categoria: "error",
        });

        setTimeout(() => {
          setAlerta({ msg: "", categoria: "" });
        }, 3000);

        return;
      }

      setAlerta({ msg: "", categoria: "" });

      setCargando(true);

      const response = await clienteAxios.post(`/users/signin`, usuario);

      //localStorage.setItem("tokenMercadito", data.token);

      //setToken(data);

      setCargando(false);

      navigate("/home");
    } catch (err) {
      if (!err.response) {
        setAlerta({
          msg: "Fallas internas, por favor inténtelo más tarde.",
          categoria: "error",
        });
      } else {
        setAlerta({
          msg: err.response.data.msg,
          categoria: "error",
        });
      }
      setTimeout(() => {
        setAlerta({ msg: "", categoria: "" });
      }, 3000);
    }
    setCargando(false);
  };

  console.log(alerta);

  const { msg } = alerta;

  return (
    <LayoutAuth>
      <div className="form login">
        <div className="form-content">
          <header>Iniciar Sesión</header>
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                name="email"
                onChange={handleChange}
                value={email}
              />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password"
                name="password"
                onChange={handleChange}
                value={password}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="form-link">
              <Link to="forgot-password" className="forgot-pass">
                ¿Olvidaste la contraseña?
              </Link>
            </div>
            {cargando ? (
              <Spinner />
            ) : (
              <div className="field button-field">
                <button>Iniciar Sesión</button>
              </div>
            )}
          </form>

          <div className="form-link">
            <span>
              ¿No tienes cuenta aun?{" "}
              <Link to="register" className="link signup-link">
                Regístrate
              </Link>
            </span>
          </div>
        </div>

        <div className="line"></div>

        <div className="media-options">
          <a href="#" className="field google">
            <img src="images/google.png" alt="" className="google-img" />
            <span>Iniciar Sesión con Google</span>
          </a>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default Login;
