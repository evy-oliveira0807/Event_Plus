import React from "react";
import { dateFormatDbToView } from "../../../Utils/stringFuctions";

// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

import comentaryIcon from "../../../assets/images/comentary-icon.svg";


import "./TableEva.css";
 
const TableDev = ({ dados }) => {
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Evento
          </th>
          {/* <th className="tbal-data__head-title tbal-data__head-title--big">
            Descrição
          </th> */}
          {/* <th className="tbal-data__head-title tbal-data__head-title--big">
            Tipo
          </th> */}
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Data
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Descrição
          </th>
        </tr>
      </thead>
      <tbody>
        {dados.map((e) => {
          return (
            <tr className="tbal-data__head-row" key={Math.random()}>
              <td className="tbal-data__data tbal-data__data--big">
                {e.nomeEvento}
              </td>
              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {/* {e.dataEvento} */}
                {dateFormatDbToView(e.dataEvento)}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {e.descricao}
        
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableDev;
