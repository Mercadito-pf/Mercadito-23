import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../Filter/Filter";
import Order from "../Order/Order";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import carrito from "../icons/carrito.png";
import user from "../icons/user.png";
import bag from "../icons/bag.png";
import { logoutUser } from "../../redux/user/userActions";

export default function NavBar() {
  let { currentPage } = useSelector((state) => state);
  let { profile } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  return (
    <div className="containerNavbar">
      <nav className="nav">
        <ul className="contentButton">
          <li className="logo">
            <Link to="/">
              <h1>Mercadito</h1>
              <h5>COMPRA Y VENDE SEGURO</h5>
            </Link>
          </li>
          <SearchBar />
          {/* <li className='item'>
                <a href="!#">Crear cuenta</a>
              </li> */}
          {profile?.profile_picture ? (
            <>
              <div>
                <img
                  className="profile_picture"
                  src={`${profile?.profile_picture}`}
                />
              </div>
              <li className="item">
                <button onClick={() => dispatch(logoutUser())}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <li className="item">
              <Link to="/login">
                <img src={user} />
                Iniciar sesion
              </Link>
            </li>
          )}
          <li className="item">
            <Link to="/my-shoping">
              <img src={bag} />
              Mis compras
            </Link>
          </li>
          <li className="item">
            <Link to="/shoping-car">
              <img src={carrito} />
              Carrito
            </Link>
          </li>
        </ul>
      </nav>

      <div className="categories">
        <ul className="contentCategory">
          <li className="item">
            <a href="!#" className="categoria">
              Categorias
            </a>
            <Filter />
          </li>
          {currentPage > 0 && (
            <li className="item">
              <a href="!#">Ordenar por:</a>
              <Order />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
