import React,{useContext} from 'react';
import './Nav.css';

import logoMobile from '../../assets/images/logo-white.svg';
import logoDesktop from '../../assets/images/logo-pink.svg';
import { UserContext } from '../../Context/AuthContext';

import { Link } from 'react-router-dom'; 

const Nav = ({ exibeNavbar, setExibeNavbar }) => {
    const { userData } = useContext(UserContext);
  
    return (
      <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
        <span
          onClick={() => {
            setExibeNavbar(false);
          }}
          className="navbar__close"
        >
          x
        </span>
  
        <Link to="/" className="eventlogo">
          <img
            className="eventlogo__logo-image"
            src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
            alt="Event plus logo"
          />
        </Link>
  
        <div className="navbar__items-box">
          <Link to="/" className="navbar__item">
            Home
          </Link>
  
          {userData.nome && userData.role === "administrador" ? (
            <>
              <Link to="/tipos-eventos" className="navbar__item">
                Tipos Eventos
              </Link>
              <Link to="/eventos" className="navbar__item">
                Eventos
              </Link>
               <Link to="/detalhes-evento" className="navbar__item">
                detalhesEvento
              </Link>  
            </>
          ) : userData.nome && userData.role === "comum" ? (
            <>
            <Link to="/eventos-aluno" className="navbar__item">
              Eventos Alunos
            </Link>
            <Link to="/contatos" className="navbar__item">
                Contatos
            </Link>
          </>
          ) : null}
        </div>
      </nav>
    );
  };

export default Nav;