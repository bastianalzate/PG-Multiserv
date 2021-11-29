/* axios parser */
import axios from 'axios';
/* action types */
import {
    BUSCAR,
    ORDERALPH,
    ORDERRAT,
    SERVICIOS,
    USUARIOS,
    RESETORDER,
    FILTERCAT,
    GETCATS,
    SERVICIOID,
    EMPATYSERVICIOID,
    USUARIOID,
    EMPATYUSUARIO,
    FAVORITES,
    ELIMINARFAVORITES,
    CLIENTES_BUSCADOS,
    PROVEDORES_BUSCADOS,
    SERVICIOS_BUSCADOS,
    CATEGORIAS_BUSCADAS,
    REVIEWS,
    MIS_SERVICIOS,
    ELIMINAR_MISERVICIO,
    EDITAR_MISERVICIO,
    MIS_CITAS,
    MAPSERVICES,
    VER_HORARIOS,
    ELIMINAR_CITAS,
    RESERVAS,
    STATUS_CITA,
} from '../actionTypes/actionTypes';

/* Traer servicios */
export const services = () => {
    return async function (dispatch) {
        let services = `/services`;
        const response = await axios(services);
        const dataServ = response.data
        return dispatch({
            type: SERVICIOS,
            payload: dataServ
        })
    }
}
/* Traer Usuarios */
export const users = () => {
    return async function (dispatch) {
        let users = `usuarios`;
        const response = await axios(users);
        const dataUsers = response.data.map(user => user)
        return dispatch({
            type: USUARIOS,
            payload: dataUsers
        })
    }
}
/* Traer servicios con location */
export const mapServices = () => {
    return async function(dispatch){
        let map = `ubicacion`;
        const response = await axios(map);
        const dataServMap = response.data
        return dispatch({
            type: MAPSERVICES,
            payload: dataServMap
        })
    }
}
/* Obtener las categorias  */
export const getCats = () => {
    return async function (dispatch) {
        let categories = `categorias`;
        const response = await axios(categories);
        const dataCats = response.data.map(cat => {
            return { id: cat.id, name: cat.title, value: cat.title }
        })
        return dispatch({
            type: GETCATS,
            payload: dataCats
        })
    }
}
/* Filtrado por categoria */
export const filterCats = (nombre) => { return { type: FILTERCAT, payload: nombre } }
/* Buscar Servicio */
export const buscar = (nombre) => { return { type: BUSCAR, payload: nombre } }
/* Ordenar Servicios */
/* Por alfabeto */
export const orderAlph = (by) => {
    return { type: ORDERALPH, payload: by }
}
/* Por rating */
export const orderRating = (by) => { return { type: ORDERRAT, payload: by } }

export const resetOrder = (action) => { return { type: RESETORDER } }

//Traer detalle de USUARIO
export const usuarioId = (id) => {
    return async function (dispatch) {
        let services = `usuarios/${id}`;
        const response = await axios(services);
        return dispatch({
            type: USUARIOID,
            payload: response.data
        })
    }
}
// vacia detalle de USUARIO /
export const empatyusuarioId = (id) => {
    return async function (dispatch) {
        return dispatch({
            type: EMPATYUSUARIO,
        })
    }
}

// Traer detalle de servicio /
export const servicesId = (id) => {
    return async function (dispatch) {
        let services = `services/${id}`;
        const response = await axios(services);
        return dispatch({
            type: SERVICIOID,
            payload: response.data
        })
    }
}
// vacia detalle de servicio */
export const empatyServicesId = (id) => {
    return async function (dispatch) {
        return dispatch({
            type: EMPATYSERVICIOID,

        })
    }
}

/* Traer Lista de Favoritos por Id */
export const getListFavorites = (uid) => {
    return async function (dispatch) {
        let fav = `favoritos/${uid}`;
        const response = await axios(fav);
        const listaFav = response.data
        return dispatch({
            type: FAVORITES,
            payload: listaFav
        })
    }
}

/* Eliminar de la Lista de Favoritos por Id */
export const deleteListFavorites = (id, uidClient) => {
    return async function (dispatch) {
        let fav = `eliminar-fav/?id=${id}&uidClient=${uidClient}`;
        const response = await axios.delete(fav);
        const listaFav = response.data
        return dispatch({
            type: ELIMINARFAVORITES,
            payload: listaFav
        })
    }
}
export const buscarClientes = (user) => {
    return {
        type: CLIENTES_BUSCADOS,
        payload: user
    }
}

export const buscarProvedores = (user) => {
    return {
        type: PROVEDORES_BUSCADOS,
        payload: user
    }
}

export const buscarServicios = (servicio) => {
    return {
        type: SERVICIOS_BUSCADOS,
        payload: servicio
    }
}

export const buscarCategorias = (categoria) => {
    return {
        type: CATEGORIAS_BUSCADAS,
        payload: categoria
    }
}

// Traer reviews
export const getReviews = (id) => {
    //console.log("entre al actions "+ id+".....")
    return async function (dispatch) {
        let review = `resena/${id}`;
        const response = await axios(review);
        return dispatch({
            type: REVIEWS,
            payload: response.data
        })
    }
}

// Traer Mis Servicios
export const getServicios = (uidClient) => {
    return async function (dispatch) {
        let service = `my-services/${uidClient}`;
        const res = await axios(service);
        const misServicios = res.data;
        return dispatch({
            type: MIS_SERVICIOS,
            payload: misServicios
        })
    }
}

/* Eliminar mi servicio de mis Servicios por Id */
export const deleteMyServices = (id, uidClient) => {
    return async function (dispatch) {
        const service = `delete-service/${id}`;
        await axios.delete(service);
        const res = await axios(`my-services/${uidClient}`);
        const misServicios = res.data
        return dispatch({
            type: ELIMINAR_MISERVICIO,
            payload: misServicios
        })
    }
}

//Editar uno de mis servicios (recibe el id del servicio 
//y datos: title, currency, category, description, max, min, rating, photos, direccion, estadoDePago )
export const updateService = (id, datos) => {
    return async function (dispatch) {
        const updtservice = `edit-service/${id}`;
        await axios.put(updtservice, datos);
        let service = `services/${id}`;
        const response = await axios(service);
        return dispatch({
            type: EDITAR_MISERVICIO,
            payload: response.data
        })



    }
}
// Traer mis citas por uidClient
export const getMisCitas = (uidClient) => {
    return async function (dispatch) {
        let citas = `citas/${uidClient}`;
        const response = await axios(citas);
        const cita = response.data
        return dispatch({
            type: MIS_CITAS,
            payload: cita
        })
    }
}

/* Traer Horarios */
export const getHorarios = (idService) => {
    return async function (dispatch) {
        let horarios = `horarios/${idService}`;
        const response = await axios(horarios);
        const dataServ = response.data
        return dispatch({
            type: VER_HORARIOS,
            payload: dataServ
        })
    }
}

/* Eliminar de la misCitas por Id */
export const cancelarCita = (id, uidClient) => {
    return async function (dispatch) {
        let url = `citas/${id}`;
        await axios.delete(url);
        const response = await axios(`citas/${uidClient}`);
        const misCitas = response.data
        return dispatch({
            type: ELIMINAR_CITAS,
            payload: misCitas
        })
    }
}


/* Ver mis reservas por idServices */
export const getReservas = (uidClient) => {
    return async function (dispatch) {
        let service = `my-services/${uidClient}`;
        const misServicios = await axios(service);
        let arrayIds = [];
       for (let i = 0; i < misServicios.data.length; i++) {
         arrayIds.push(misServicios.data[i].id);
       }
        const response = await axios.post('reservas', { ids: arrayIds });
        const reservas = response.data
        return dispatch({
            type: RESERVAS,
            payload: reservas
        })
    }
}


/* Cambiar status Cita para Reseña */
export const statusCita = (id, uidClient) => {
    return async function (dispatch) {
        await axios.put(`citas/${id}`);
        console.log(uidClient,'as')
        let citas = `citas/${uidClient}`;
        const response = await axios(citas);
        const cita = response.data
        return dispatch({
            type: STATUS_CITA,
            payload: cita
        })
    }
}