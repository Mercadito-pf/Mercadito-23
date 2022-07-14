import React from "react";
import { Link } from "react-router-dom";
import LayoutAuth from "../Layout/LayoutAuth";

const NewPassword = () => {
  return (
    <LayoutAuth>
      <div className="form">
        <div className="form-content">
          <header>Nueva Contraseña</header>
          <form action="#">
            <div className="field input-field">
              <input
                type="password"
                placeholder="Contraseñia"
                className="password"
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Confirmar Contraseñia"
                className="password"
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="field button-field">
              <button>Guardar Contraseña</button>
            </div>

            <div className="form-link">
              <Link to="login">Iniciar Sesión</Link>
            </div>
          </form>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default NewPassword;
