import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../Filter/Filter";
import Order from "../Order/Order";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.scss";
import carrito from "../icons/carrito.png";
import user from "../icons/user.png";
import bag from "../icons/bag.png";
import hamburguesa from '../icons/menu.png';
import dots from '../icons/dots.png'
import { authenticate, logoutUser } from "../../redux/user/userActions";
import { googleLogout } from "@react-oauth/google";

export default function NavBar() {

  let history = useHistory()
  let { currentPage } = useSelector((state) => state.reducer);
  useEffect(() => {
    dispatch(authenticate());
  }, []);

  let { profile } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const logout = () => {

    googleLogout();
    dispatch(logoutUser());
    if (profile._id) {
      history.push("/")
    }
  };

  return (
    <div className="containerNavbar">
      <nav className="nav">
        <ul className="contentButton">
          <li className="logo">
            <Link to="/" className="logo">
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
                <button onClick={logout}className="btn">
            <span className="span1"></span>
            <span className="span2"></span>
            <span className="span3"></span>
            <span className="span4"></span>
               Cerrar Sesion
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
          <Link to="/shoping-car">Carrito</Link>
          </li>
          

         {profile?._id&& <li className="item">
            <Link to="/favorites">Favoritos</Link>
          </li>}


          {profile?._id &&<li className="item">
            <Link to="/create"className="i">Vender</Link>
          </li>}

          {/* <li className="item">
            <Link to="/my-shoping">
              <img src={bag} />
              Mis compras
            </Link>
          </li> */}
          {/* <li className="item">
            <Link to="/shoping-car">
              <img src={carrito} />
              Carrito
            </Link>
          </li> */}
        </ul>
      </nav>

      <div className="categories">
        <ul className="contentCategory">
          <div className="dropdown">
            <img src={hamburguesa}/>
            <h4 className="categoria">Ver todas las categorias</h4>
              <div className='dropdown-content' >
                <Filter />
              </div>
          </div>
          {currentPage > 0 && (
          <div className='order-category'>
              <img src={dots}/>
              <h2>Ordenar por</h2>
                <div className='order'>
                  <Order/>
                </div>
          </div>
          )}
        </ul>
      </div>

    </div>
  );
}
