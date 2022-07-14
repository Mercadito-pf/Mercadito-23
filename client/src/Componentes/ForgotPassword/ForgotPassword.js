import React from "react";
import { Link } from "react-router-dom";
import LayoutAuth from "../Layout/LayoutAuth";

const ForgotPassword = () => {
  return (
    <LayoutAuth>
      <div className="form login">
        <div className="form-content">
          <header>Olvide Contraseña</header>
          <form action="#">
            <div className="field input-field">
              <input type="email" placeholder="Correo" className="input" />
            </div>

            <div className="field button-field">
              <button>Iniciar Sesión</button>
            </div>

            <div className="form-link">
              <span>
                ¿Ya tienes una cuenta?{" "}
                <Link to="login" className="link login-link">
                  Iniciar Sesión
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default ForgotPassword;
