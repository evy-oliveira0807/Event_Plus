import React, { useContext } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";

import { Button, Input } from "../../components/FormComponents/FormComponents"
import "./Modal.css";
import { UserContext } from "../../context/AuthContext";

const Modal = ({
  modalTitle = "Comentarios",
  userId = null,
  showHideModal = false,
  dados,
}) => {

  const {userData} = useContext(UserContext)


  return (
    <div className="modal">
      <article className="modal__box">
        
        <h3 className="modal__title">
          {modalTitle}
          <span className="modal__close" onClick={() => showHideModal(true)}>x</span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          <img
            src={trashDelete}
            className="comentary__icon-delete"
            alt="Ícone de uma lixeira"
          />

          <p className="comentary__text">{}</p>

          <hr className="comentary__separator" />
        </div>
      </article>
    </div>
  );
};

export default Modal;