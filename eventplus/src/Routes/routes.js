import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";//v6

import HomePage from "../pages/HomePage/HomePage";
import EventosPage from "../pages/EventosPage/EventosPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import TestePage from "../pages/TestePage/TestePage"
import TipoEventosPage from "../pages/TipoEventosPage/TipoEventosPage"
import LoginResource from "../Services/Service";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

// imports dos componentes de página

import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import EventosAlunoPage from "../pages/EventosAlunoPage/EventosAlunoPage";
import DetalhesEventoPage from "../pages/DetalhesEventoPage/DetalhesEventoPage";



// Componente Rota 
//pginás publicas
const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path={"/"} exact />
        <Route element={<LoginPage />} path={"/login"} />
        <Route element={<DetalhesEventoPage/>} path={"/detalhes-evento/:idEvento"}  />

        <Route
          path={"/tipos-eventos"}
          element={
            <PrivateRoute redirectTo="/">
              <TipoEventosPage />
            </PrivateRoute>
          }
        />

         <Route
          path={"/eventos-aluno"}
          element={
            <PrivateRoute redirectTo="/">
              <EventosAlunoPage />
            </PrivateRoute>
          }
        />

        <Route
          path={"/eventos"}
          element={
            <PrivateRoute redirectTo="/">
              <EventosPage />
            </PrivateRoute>
          }
        />

       

        <Route element={<TestePage />} path={"/testes"} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;
