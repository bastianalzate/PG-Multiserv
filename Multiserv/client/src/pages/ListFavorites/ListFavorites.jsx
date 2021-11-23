import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getListFavorites, deleteListFavorites } from "../../redux/actions/actions";

const ListFavorites = () => {  
  const navigate = useNavigate()
  var { uidClient } = useParams();
  const { servicios, misFavoritos } = useSelector(state => state)
  const dispatch = useDispatch()
  var favoritos = '';
  if(typeof misFavoritos !== 'string' && misFavoritos.length > 0 ){ favoritos = misFavoritos}

  useEffect(() => {
    dispatch(getListFavorites(uid));
  }, []);

  const eliminarFav = (e) => {
    dispatch(deleteListFavorites(e.target.name, uid))
  }
  const irAlLink = (e) => {
    navigate(`/home/detalleServicio/${e.target.name}`)
  }
  return (
    <div className="w-full h-screen block p-4 ">
      <h1 className="text-4xl font-bold pb-4 border-b-2 border-gray-200">Mis Favoritos</h1>
      <div className="mt-2 grid grid-cols-3 gap-4">
        {typeof favoritos !== 'string' && favoritos.length > 0
          ? favoritos.map((favorito) => (
            <div className='w-full shadow my-1 p-3 rounded-lg flex' key={favorito.id}>
              <div>
                <img className='w-36 rounded' src={favorito.photos[0]} alt={favorito.title} />
              </div>
              <div className='ml-4 flex flex-col'>
                <span className='text-xl font-semibold' >{favorito.title}</span>
                <button className='bg-red-500 rounded my-1 text-white font-bold' name={favorito.id} onClick={eliminarFav}>Eliminar</button>
                <button onClick={irAlLink} name={favorito.idService} className='bg-cyan-600 rounded my-1 text-white font-bold' >Ver</button>
              </div>
            </div>
          ))
          : <span className="justify-center" >No hay favoritos</span>}
      </div>

    </div>
  );
};


export default ListFavorites
