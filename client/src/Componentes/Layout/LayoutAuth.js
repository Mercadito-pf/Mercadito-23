import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./layoutauth.css";

const LayoutAuth = ({ children }) => {
  let { profile, cargando } = useSelector((state) => state.userReducer);

  const navigate = useHistory();

  if (cargando) return "cargando";

  return (
    <>
      {profile.id ? (
        navigate.push("/")
      ) : (
        <section className="containerAuth forms">{children}</section>
      )}
    </>
  );
};

export default LayoutAuth;
