import "./App.css";
import Rotas from "./Routes/routes";
import { UserContext } from "./Context/AuthContext";
import { useEffect, useState } from "react";

const App = () => {
    const[userData, setUserData] = useState({})
    //função para que o usúario fique logado.
    useEffect(() => {
      const token = localStorage.getItem("token");
      //Json.Parse: //Validação para caso o usuário não for nulo manter logado ao atualizar a pagina
      setUserData(token === null ? {} : JSON.parse(token))
    },[]);
  return (
    
    <UserContext.Provider value={{userData,setUserData}}>
      <Rotas />
    </UserContext.Provider>
  );
};

export default App;


