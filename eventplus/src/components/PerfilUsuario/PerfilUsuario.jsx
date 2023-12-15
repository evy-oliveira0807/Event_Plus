import React, { useContext } from "react";
import iconeLogout from "../../assets/images/icone-logout.svg";

import "./PerfilUsuario.css";
import { UserContext, userDecodeToken } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const PerfilUsuario = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    //limpa o local storage
    // localStorage.clear()
    //esvazia os dados do usuario
    setUserData({});
    //volta para a home
    navigate("/");
  };

  return (
    <div className="perfil-usuario">
      {userData.nome ? (
        <>
          <span className="perfil-usuario__menuitem">{userData.nome}</span>
          <img
            onClick={Logout}
            title="Deslogar"
            className="perfil-usuario__icon"
            src={iconeLogout}
            alt="imagem ilustrativa de uma porta de saída do usuário "
          />
        </>
      ) : (
        <Link className="perfil-usuario__menuitem" to="/Login">
          Login
        </Link>
      )}

    </div>
  );
};

export default PerfilUsuario;
