//essa página é como se fosse o context da api No Backend
//que traz os dados do usúario e o token
import { jwtDecode } from "jwt-decode";
import { createContext } from "react";

export const UserContext = createContext(null);

export const userDecodeToken = (theToken) => {
    const decod = jwtDecode(theToken);//objeto do payload
    return {role: decod.role, nome: decod.name, userId: decod.jti, token: theToken}
}