import axios from 'axios';

/**
 * Módulo para trabalhar com apis. Disponibiliza as rotas da api bem como o serviço com a biblioteca axios
 */

/**
 * Rota para o recurso Evento
 */
export const eventsResource = '/Evento';

// Rota para Listar Anteriores

export const PastEventsResouce = '/Evento/ListarAnteriores'

/**
 * Rota para orecurso Próximos Eventos
 */
export const nextEventResource = '/Evento/ListarProximos';

/**Rota para os comentarios */
export const myComentaryResource = '/ComentariosEvento/BuscarPorIdUsuario'

// Rota para presenças evento

export const presenceEvents = '/PresencasEvento';

export const CommentaryResource = '/ComentariosEvento';

export const CommentaryBuscarpoIdResource = '/ComentariosEvento/BuscarPorIdUsuario';


// Rota para listar minhas presenças evento

export const presenceEventResource = '/PresencasEvento/ListarMinhas';
/**
 * Rota para o recurso Tipos de Eventos
 */
export const eventsTypeResource = '/TiposEvento';


export const loginResource = `/Login`

const apiPort = '7118';

// const localApiUri = `https://localhost:${apiPort}/api`;
const localApiUri = `https://eventplusweb.azurewebsites.net/api`;

const externalApiUri = null;

const api = axios.create({
    baseURL: localApiUri
});



export default api;