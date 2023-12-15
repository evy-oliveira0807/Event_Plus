import React, { useEffect, useState, Link } from "react";
import "./HomePage.css";

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import PastEvent from "../../components/PastEvent/PastEvent";
import Container from "../../components/Container/Container";
import api, { PastEventsResouce } from "../../Services/Service";

import { nextEventResource } from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState("");
  const [PastEvents, setPastEvents] = useState([]);


  // roda somente na inicialização do componente
  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await api.get(nextEventResource);
        const dados = await promise.data;
        console.log(dados);
        setNextEvents(dados); //atualiza o state
      } catch (error) {
        console.log("Deu ruim na api!");
      }
    }

    getNextEvents(); //chama a função
  }, []);

    // roda somente na inicialização do componente
    useEffect(() => {
      async function getPastEvents() {
        try {
          const promise = await api.get(PastEventsResouce);
          const dados = await promise.data;
          console.log(dados);
          setPastEvents(dados); //atualiza o state
        } catch (error) {
          console.log("Deu ruim na api!");
        }
      }
  
      getPastEvents(); //chama a função
    }, []);

  return (

    <MainContent>
      <Banner />
      
      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">
            {nextEvents.map((e) => {
              return (
                <NextEvent
                key={e.idEvento}
                title={e.nomeEvento}
                description={e.descricao}
                eventDate={e.dataEvento}
                idEvent={e.idEvento}
                />
                );
              })}
              
          </div>
        </Container>
      </section>

      {/* Eventos anteriores */}

      <section className="proximos-eventos">
        <Container>
          <Title titleText={" Eventos Anteriores"} />

          <div className="events-box">
            {PastEvents.map((e) => {
              return (
                <PastEvent
                key={e.idEvento}
                title={e.nomeEvento}
                description={e.descricao}
                eventDate={e.dataEvento}
                idEvent={e.idEvento}
                />
                );
              })}
              
          </div>
        </Container>
      </section>

      <VisionSection />
      <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
      <ContactSection />
      
    </MainContent>
  );
};

export default HomePage;
