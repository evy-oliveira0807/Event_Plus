import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import Table from "./TableEva/TableEva";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, {
  eventsResource,
  myComentaryResource,
  presenceEventResource,
  presenceEvents,
  CommentaryBuscarpoIdResource
} from "../../Services/Service";


import "./EventosAlunoPage.css";
import { UserContext } from "../../Context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [idEvento,setIdEvento]=useState();
  const [comentario,setComentario]=useState();


  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

    //outros States
  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // utiliza o hook "useContext" para acessar o contexto "UserContext" e obter os dados globais do usuário.
  const { userData, setUserData } = useContext(UserContext);

 //carrega os eventos quando a pag for atualizda
  useEffect(() => {

  

    loadEventsType();
  }, [tipoEvento]); //userData.userid

   // função que carrega os  eventos
  async function loadEventsType() {
    setShowSpinner(true);
    setEventos([])
    //traz todos os eventos
    if (tipoEvento === "1") {
      try {
        //get para o select de todos os eventos
        const todosEventos = await api.get(eventsResource);
        //get para o select dos meus eventos
        const meusEventos = await api.get(`${presenceEventResource}/${userData.userId}`);

        const eventosMarcados = verificaPresenca(todosEventos.data, meusEventos.data);
        setEventos(eventosMarcados);
                  
        console.clear()
        console.log("TODOS EVENTOS");
        //console.log(todosEventos.data);

        console.log("MEUS EVENTOS");
        //console.log(meusEventos.data);

        console.log("EVENTOS MARCADOS");
        //console.log(eventosMarcados);

      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }
    } else {
      
      try {
        //acessa o get de presencas evento da api passando o user Id.
        const todosEventos = await api.get(`${presenceEventResource}/${userData.userId}`);
        //console.log(todosEventos.data);

        const arrEventos = [];//array vazio - para guardar os eventos pois a api retona Meuseventos como objeto

        //percorre a lista de eventos e guarda no array os que há situação = true(que o usúario está cadastrado)
        todosEventos.data.forEach(e => {
         arrEventos.push({...e.evento, situacao : e.situacao});
        })
        //retorna o array
        setEventos(arrEventos);
        //console.log(arrEventos.data);
      } catch (error) {
        console.log(`Erro na Api ${error}`);
        console.log(error);
      }
      
    }

    setShowSpinner(false);
  }
  //função que verifica cada item do array(eventos)/
  //caso o id do usúario esteja vinculado ele coloca a presença como true
  const verificaPresenca = (arrAllEvents, eventsUser) => {
    for (let x= 0; x < arrAllEvents.length; x++){// percorre e itera o array para cada evento principal
      for (let i= 0; i < eventsUser.length; i++){// percorre e itera o array procura o correspondente
        
        /* compara os dois arrays
        verifica quais eventos no array arrAllEvents o usúario esta associado através 
        do id percorrendo o array eventsUser.*/
        
        if (arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento) {
          arrAllEvents[x].situacao = true; //caso ache o mesmo evento (traves do id), ele marca a situacao como true.
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break;//paro de procurar para o evento principal atual
        }
      }

    }
    //retorna todos os eventos marcados com a presença do usúario
    return arrAllEvents;

  }

  // toggle meus eventos ou todos os eventos
  async function myEvents(tpEvent) {

    setTipoEvento(tpEvent)

  }


  async function postMyCommentary() {
    // const retornoGet = api.post(CommentaryBuscarpoIdResource,{

  /****LER COMENTÁRIO***** */
  async function loadMyComentary(idComentary) {
    setShowSpinner(true);
    try {
        const promise = await api.get(`${myComentaryResource}/${idComentary}`);
    } catch (error) {
        alert('Erro ao trazer comentario')
    }
    setShowSpinner(false);
  }


    // })
  }
  const loadMyComentary = async (idUsuario,idEvento) => {
   
    const retorno = await api.get(`${CommentaryBuscarpoIdResource}?idUsuario=${idUsuario}&idEvento=${idEvento}` )
    console.log("USUARIO : " + idUsuario)
    console.log("iDeVENTO = " + idEvento)
    //const retorno = await api.get('/ComentariosEvento/BuscarPorIdUsuario?e7fb9a13-127c-487a-355b-08dbf4c0719b&1157f166-4567-41cb-baee-199633eeba7d')
    console.log(retorno);
    //console.log("retorno da api get.descriçao = " + Promise.data.descricao);
    setComentario(retorno.data.descricao);
}

    //********** CADASTRAR UM COMENTARIO POST *********** */
    async function postMyComentary() {
      try {
        const promise = await api.post(myComentaryResource,{
          //objeto com as props do comentário
        });
        //notificar o usúario se deu certo.
        //atuzaliza os dados na api com uma const get.
        
      } catch (error) {
        //notificar erro
      }
  }

   /***remover comentário */
  const commentaryRemove = () => {
    alert("Remover o comentário");
  };



  const showHideModal = (idEvent) => {
    setShowModal(showModal ? false : true);
    setUserData({...userData,idEvento : idEvent})
  };



  //função que conecta (cadastra) ou desconecta o aluno do evento
  //alterndo o toggle

  async function handleConnect(eventId ,whatTheFuction, presencaId = null) {
    if (whatTheFuction === "connect") {
      //cadastra o usúario no evento através do método post da api.
      try {
        const promise = await api.post(presenceEvents, {
          situacao : true ,
          idUsuario : userData.userId, 
          idEvento : eventId,
         
        
        });
        //caso o status da promise retorne um 204(success)
        if (promise.status === 204) {
          alert('Prenseça Confirmada, parabéns!')
        }
        //ele carrega novamente 
        setTipoEvento("1");

        //salva os dados na api.
        const todosEventos = await api.get(eventsResource);
        setEventos(todosEventos.data) 
        
      } catch (error) {
        
      }

      return;
    }

    //UNCONNECT - pra remover o cadastro do usúario do evento correspondente
    // idPresencaEvento
    try {
      //deleta o usuario de presencs evento.
      const unconnect = await api.delete(`${presenceEvents}/${presencaId}`);

      if (unconnect.status === 204) {
        alert('Desconectado do evento')
        const todosEventos = await api.get(eventsResource);
        setEventos(todosEventos.data);
      }
      
    } catch (error) {
      
    }
    
    loadEventsType();
  }
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} />  */}

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} potatoClass="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => {myEvents(e.target.value)}} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={showHideModal}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyComentary}
           fnPost={postMyCommentary}
          fnDelete={commentaryRemove}
          comentaryText={comentario}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
