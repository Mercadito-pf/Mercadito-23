import React from "react";
import { Link } from "react-router-dom";
import LayoutAuth from "../Layout/LayoutAuth";

const Login = () => {
  return (
    <LayoutAuth>
      <div className="form login">
        <div className="form-content">
          <header>Iniciar Sesión</header>
          <form action="#">
            <div className="field input-field">
              <input type="email" placeholder="Email" className="input" />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password"
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="form-link">
              <Link to="forgot-password" className="forgot-pass">
                ¿Olvidaste la contraseña?
              </Link>
            </div>

            <div className="field button-field">
              <button>Iniciar Sesión</button>
            </div>
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
