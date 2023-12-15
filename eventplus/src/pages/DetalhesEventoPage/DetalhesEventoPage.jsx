import React,{useEffect, useParams} from 'react';
import './DetalhesEventoPage.css'
import api, { CommentaryResource, eventsResource } from '../../Services/Service';
import Title from '../../components/Title/Title';
import MainContent from '../../components/MainContent/MainContent';
import Container from '../../components/Container/Container';
import idEvento from '../../components/PastEvent/PastEvent'
import Table from '../EventosAlunoPage/TableEva/TableEva';


const DetalhesEventoPage = () => {

  
  const [evento, setEvento] = [];

  
  useEffect(() => {
    getEvento();
  },[])
  
  //get para trazer o detalhe do evento
  async function getEvento() {

    try {
      const retornaEvento = await api.get(`${eventsResource}/${idEvento}`)
  
      setEvento(retornaEvento.data)
      console.log(retornaEvento);
      
    } catch (error) {
      
      alert('get falhou')
    }
  }

  //get para trazer comentario do evento

  async function getComentario() {
    const retornaComentario = await api.get(`${CommentaryResource}/${idEvento}`)
    
    setEvento(retornaComentario.data)
    console.log(retornaComentario);
  }
  

    return(
        <>
        <MainContent>
        <Container>
        <Title titleText={"Detalhes do Evento"} potatoClass="custom-title"/>  
        <Table
        evento={evento}
        />
        </Container>
      </MainContent>   
        </>
    )        
        
 }

export default DetalhesEventoPage;