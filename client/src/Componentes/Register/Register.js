import React from "react";
import { Link } from "react-router-dom";
import LayoutAuth from "../Layout/LayoutAuth";

const Register = () => {
  return (
    <LayoutAuth>
      <div className="form signup">
        <div className="form-content">
          <header>Regístrate</header>
          <form action="#">
            <div className="field input-field">
              <input type="email" placeholder="Email" className="input" />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Create password"
                className="password"
              />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Confirm password"
                className="password"
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="field button-field">
              <button>Regístrate</button>
            </div>
          </form>

          <div className="form-link">
            <span>
              ¿Ya tienes una cuenta?{" "}
              <Link to="login" className="link login-link">
                Iniciar Sesión
              </Link>
            </span>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default Register;
