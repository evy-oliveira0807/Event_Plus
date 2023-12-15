import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, redirectTo = "/" }) => {
    //Verificar se está autenticado, busca o usuario pelo localStorage passa a chave token, se ele nao estiver nulo(no caso logado) devolve o children que seria a pagina que ele esta tentando acessar, se não volta para a home
    const isAuthenticated = localStorage.getItem("token") !== null;

    //Retornar o componente ou navegar para a Home
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}