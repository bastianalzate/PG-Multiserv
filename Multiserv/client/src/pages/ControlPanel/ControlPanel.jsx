import React, { useEffect, useState } from "react";
import Imagen from "../../../src/assets/images/img1.webp";
import { FaUser, FaUserTie } from "react-icons/fa";
import { MdHomeRepairService, MdCategory } from "react-icons/md";
import ImagenPerfil from "../../assets/Icons/profile.png";
import { users, services, getCats } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from 'sweetalert2';


const ControlPanel = () => {
    const [vistaUsuarios, setVistaUsuarios] = useState("clientes");
    const { usuarios, servicios, categories } = useSelector(state => state);
    const dispatch = useDispatch();

    const cambiarAProvedor = () => {
        setVistaUsuarios("provedores")
    }

    const cambiarAClientes = () => {
        setVistaUsuarios("clientes")
    }
    
    const cambiarACategorias = () => {
        setVistaUsuarios("categorias")
    }
    
    const cambiarAServicios = () => {
        setVistaUsuarios("servicios")
    }

    // Eliminar usuario
    const eliminarUsuario = (uid) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Al hacer esto perderas todo en tu usuario",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#32C1CD',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar usuario!',
            cancelButtonText: "Cancelar"
          }).then((result) => {
              console.log(result)
            if (result.isConfirmed) {
                axios(`http://localhost:3005/eliminar-usuario/${uid}`)
                .then(async response => {
                    Swal.fire(
                        'Eliminado!',
                        'El usuario se ha eliminado con exito!',
                        'success'
                    )
                    dispatch(users())
                })
                .catch(err => {
                    Swal.fire('Changes are not saved', '', 'info')
                })
            }
          })
    }

    // cambiar admin
    const adminTrue = (user) => {
        const { uidClient } = user;
        const { displayName, photoURL, phone } = user;
        const [name, lastName] = displayName.trim().split(" ");
        axios.put(`http://localhost:3005/editar-usuario/${uidClient}`, {
            name: name,
            lastName: lastName,
            photoURL: photoURL,
            phone: phone,
            isAdmin: true
        })
        .then(response => {
            console.log(response)
            // setLoading(false)
            Swal.fire(
                'Actualizado!',
                `Ahora ${response.data.usuarioActualizado.displayName} es administrador!`,
                'success'
            )
            dispatch(users())
        })
        .catch(err => console.log(err))
    }

    const adminFalse = (user) => {
        const { uidClient } = user;
        const { displayName, photoURL, phone } = user;
        const [name, lastName] = displayName.trim().split(" ");
        axios.put(`http://localhost:3005/editar-usuario/${uidClient}`, {
            name: name,
            lastName: lastName,
            photoURL: photoURL,
            phone: phone,
            isAdmin: false
        })
        .then(response => {
            console.log(response)
            // setLoading(false)
            Swal.fire(
                'Actualizado!',
                `Permisos revocados!`,
                'success'
            )
            dispatch(users())
        })
        .catch(err => console.log(err))
    }

    const editarNombreCategorias = (id) => {
        Swal.fire({
            title: '¿Cual es el nuevo nombre?',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Modificar',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put("http://localhost:3005/edit-categorias", {
                    id, 
                    newTitle: result.value
                })
                .then(response => {
                    Swal.fire(
                        'Modificado!',
                        'Nombre de categoria cambiado con exito!',
                        'success'
                    )
                    dispatch(getCats())
                })
            }
          })
    }

    const eliminarCategoria = (id) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Al hacer esto perderas esta categoria",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#32C1CD',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar categoria!',
            cancelButtonText: "Cancelar"
          }).then((result) => {
              console.log(result)
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3005/categorias/${id}`)
                .then(response => {
                    Swal.fire(
                        'Eliminado!',
                        'La categoria se ha eliminado con exito!',
                        'success'
                    )
                    dispatch(getCats())
                })
                .catch(err => {
                    Swal.fire('Ha ocurrido un error', '', 'info')
                })
            }
          })
    }

    const eliminarServicio = (id) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Al hacer esto perderas este servicio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#32C1CD',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar servicio!',
            cancelButtonText: "Cancelar"
          }).then((result) => {
              console.log(result)
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3005/delete-service/${id}`)
                .then(response => {
                    Swal.fire(
                        'Eliminado!',
                        'El servicio se ha eliminado con exito!',
                        'success'
                    )
                    dispatch(services())
                })
                .catch(err => {
                    Swal.fire('Ha ocurrido un error', '', 'info')
                })
            }
          })
    }

    const mostrarDescripcion = (service) => {
        console.log(service)
        Swal.fire({
            title: 'Descripción!',
            text: service.description,
            imageUrl: service.photos[0],
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    }

    const agregarCategoria = () => {
        Swal.fire({
            title: '¿Cual es el nombre de la nueva categoria?',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.post("http://localhost:3005/categorias", {
                    title: result.value
                })
                .then(response => {
                    Swal.fire(
                        'Categoria Agregada',
                        'La categoria se ha agregado con exito!',
                        'success'
                    )
                    dispatch(getCats())
                })
            }
          })
        
    }

    useEffect(() => {
        dispatch(users())
        dispatch(services())
        dispatch(getCats())
    }, []);

    return(
        <div className="w-full flex">
            <div className="w-1/5 h-screen bg-gray-100 ">
                <div className="w-full flex justify-center py-2 ">
                    <h2 className="text-xl font-semibold">MultiServ</h2>
                </div>
                {/* Inicio seccion administrar usuarios */}
                <div className="w-full flex justify-start px-2 mt-5">
                    <h2 className="text-md font-semibold ">Administrar usuarios</h2>
                </div>
                <div className="w-full flex flex-col items-start   mt-2"> 
                    <button className="w-full flex items-center justify-start py-2 my-1 hover:bg-gray-200 px-4" onClick={cambiarAClientes}><FaUser width="30px" height="30px" className="mr-2"/><span>Clientes</span></button>
                    <button className="w-full flex items-center justify-start py-2 my-1 hover:bg-gray-200 px-4" onClick={cambiarAProvedor}><FaUserTie width="30px" height="30px" className="mr-2" /><span>Provedores</span></button>
                </div>
                {/* Fin seccion administrar usuarios */}

                {/* Inicio seccion administrar servicios */}
                <div className="w-full flex justify-start px-2 mt-5">
                    <h2 className="text-md font-semibold ">Administrar servicios</h2>
                </div>
                <div className="w-full flex flex-col items-start   mt-2"> 
                    <button className="w-full flex items-center justify-start py-2 my-1 hover:bg-gray-200 px-4" onClick={cambiarAServicios}><MdHomeRepairService width="30px" height="30px" className="mr-2"/><span>Servicios</span></button>
                </div>
                {/* Fin seccion administrar servicios */}

                {/* Inicio seccion administrar categorias */}
                <div className="w-full flex justify-start px-2 mt-5">
                    <h2 className="text-md font-semibold ">Administrar categorias</h2>
                </div>
                <div className="w-full flex flex-col items-start   mt-2"> 
                    <button className="w-full flex items-center justify-start py-2 my-1 hover:bg-gray-200 px-4" onClick={cambiarACategorias}><MdCategory width="30px" height="30px" className="mr-2"/><span>Categorias</span></button>
                </div>
                {/* Fin seccion administrar categorias */}
            </div>
            <div className="w-4/5 overflow-y-auto h-screen">
                
                {
                // Inicio de vista de clientes
                vistaUsuarios === "clientes" &&
                <div className="w-full flex flex-col border-2">
                    <div className="w-full h-20 fixed">
                    {/* Inicio de Buscador */}
                        <div className="flex flex-row w-full py-1 filter drop-shadow-md bg-white">
                            <div className="w-1/2 my-2 px-4 flex items-center">
                                <input
                                    className="border border-gray-400 p-2 rounded-md font-medium w-1/2" 
                                    type="text"
                                    id="lastName"
                                    onChange={() => {}}
                                    name="lastName"
                                    placeholder="Busca por nombre de provedor"
                                />
                            </div>
                            <div className="flex w-96 ml-4 justify-end items-center pr-2">
                                <div className="w-14 h-14 rounded-full bg-green-400" style={{backgroundImage: `url(${ImagenPerfil})`, backgroundSize: "cover"}} >
                                </div>
                            </div>
                        </div>
                        
                    {/* Fin Buscador */}
                    </div>

                    {/* Inicio contenedor separado del buscador */}
                    <div className="mt-20 w-full">
                    {
                        usuarios?.map(cliente => (
                            <div className="w-full flex border-2 items-center py-2 px-2 my-2">
                                <div className="h-20 w-24 rounded-full mr-4" style={{backgroundImage: `url(${cliente.photoURL})`, backgroundSize: "cover"}}></div>
                                <div className="flex flex-col w-1/2">
                                    <h2 className="text-1xl font-bold font-sans">{cliente.displayName}(Cliente)</h2>
                                    <span className="text-gray-500 text-sm -mt-1">{cliente.email}</span>
                                    <span className="text-gray-800 font-sans font-semibold text-sm ">ID: {cliente.uidClient}</span>
                                </div>
                                <div className="flex w-1/2 justify-between">
                                        <div className="flex flex-col w-20 justify-center items-center">
                                            <div className="flex items-center">
                                                <div className={`w-4 h-4 rounded-full mr-2 ${cliente.isAdmin ? "bg-green-500" : "bg-gray-500"}`}></div>
                                                <h2 className="font-semibold text-lg">Administrador</h2>
                                            </div>
                                            <span className="text-sm">{cliente.isAdmin ? "Activo" : "No Activo"}</span>
                                        </div>
                                        <div className="flex w-80 items-center">
                                            {
                                                cliente.isAdmin ?
                                                <button 
                                                    className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                                    onClick={() => adminFalse({ ...cliente, })}
                                                >
                                                quitar admin
                                                </button>
                                                :
                                                <button 
                                                    className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                                    onClick={() => adminTrue({ ...cliente, })}
                                                >
                                                volver admin
                                                </button>
                                            }
                                            <button 
                                                className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                                                onClick={() => eliminarUsuario(cliente.uidClient)}    
                                            >
                                            Eliminar 
                                            </button>
                                        </div>
                                    </div>
                            </div>
                        ))
                    }
                    {/* Fin contenedor separado del buscador */}
                    </div>
                </div>

                // Fin de vista de clientes
                }

                {
                // Inicio de vista de Provedores
                vistaUsuarios === "provedores" &&
                <div className="w-full flex flex-col border-2">
                    <div className="w-full h-20 fixed"> 
                    {/* Inicio de Buscador */}
                        <div className="flex flex-row w-full py-1 filter drop-shadow-md bg-white">
                            <div className="w-1/2 my-2 px-4 flex items-center">
                                <input
                                    className="border border-gray-400 p-2 rounded-md font-medium w-1/2" 
                                    type="text"
                                    id="lastName"
                                    onChange={() => {}}
                                    name="lastName"
                                    placeholder="Busca por nombre de provedor"
                                />
                            </div>
                            <div className="flex w-96 ml-4 justify-end items-center pr-2">
                                <div className="w-14 h-14 rounded-full bg-green-400" style={{backgroundImage: `url(${ImagenPerfil})`, backgroundSize: "cover"}} >
                                </div>
                            </div>
                        </div>

                    {/* Fin Buscador */}
                    </div>

                    {/* Inicio contenedor separado del buscador */}
                    <div className="mt-20 w-full">
                    {
                        usuarios?.map(provider => {
                            if(provider.provider){
                                return (
                                <div className="w-full flex border-2 items-center py-2 px-2 my-2">
                                    <div className="h-20 w-24 rounded-full mr-4" style={{backgroundImage: `url(${provider.photoURL})`, backgroundSize: "cover"}}></div>
                                    <div className="flex flex-col w-1/2">
                                        <h2 className="text-1xl font-bold font-sans">{provider.displayName}(Provedor)</h2>
                                        <span className="text-gray-500 text-sm -mt-1">{provider.email}</span>
                                        <span className="text-gray-800 font-sans font-semibold text-sm ">ID: {provider.uidClient}</span>
                                    </div>
                                    <div className="flex w-1/2 justify-between">
                                        <div className="flex flex-col w-20 justify-center items-center">
                                            <div className="flex items-center">
                                                <div className={`w-4 h-4 rounded-full mr-2 ${provider.isAdmin ? "bg-green-500" : "bg-gray-500"}`}></div>
                                                <h2 className="font-semibold text-lg">Administrador</h2>
                                            </div>
                                            <span className="text-sm">{provider.isAdmin ? "Activo" : "No Activo"}</span>
                                        </div>
                                        <div className="flex w-80 items-center">
                                        {
                                            provider.isAdmin ?
                                            <button 
                                                className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                                onClick={() => adminFalse({ ...provider, })}
                                            >
                                            quitar admin
                                            </button>
                                            :
                                            <button 
                                                className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                                onClick={() => adminTrue({ ...provider, })}
                                            >
                                            volver admin
                                            </button>
                                            }
                                            <button 
                                                className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                                            >
                                            Eliminar 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        })
                    }
                    {/* Fin contenedor separado del buscador */}
                    </div>
                </div>

                // Fin de vista de provedores
                }

                {
                // Inicio de vista de Categorias
                vistaUsuarios === "categorias" &&
                <div className="w-full flex flex-col border-2">
                    <div className="w-full h-20 fixed"> 
                    {/* Inicio de Buscador */}
                        <div className="flex flex-row w-full py-1 filter drop-shadow-md bg-white">
                            <div className="w-1/2 my-2 px-4 flex items-center">
                                <input
                                    className="border border-gray-400 p-2 rounded-md font-medium w-1/2" 
                                    type="text"
                                    id="lastName"
                                    onChange={() => {}}
                                    name="lastName"
                                    placeholder="Busca por nombre de categoria"
                                />
                            </div>
                            <div className="flex w-96 ml-4 justify-end items-center pr-2">
                                <div className="w-14 h-14 rounded-full bg-green-400" style={{backgroundImage: `url(${ImagenPerfil})`, backgroundSize: "cover"}} >
                                </div>
                            </div>
                        </div>
                    {/* Fin Buscador */}
                    </div>
                    {/* Inicio contenedor separado del buscador */}
                    <div className="mt-20 w-full">
                    {
                    categories?.map(categoria => (
                        <div className="w-full flex border-2 items-center py-4 px-4 my-2">
                            <div className="flex flex-col w-1/2">
                                <h2 className="text-2xl font-semibold font-sans">{categoria.name}</h2>
                                <span className="text-gray-800 font-sans font-semibold text-sm ">ID: {categoria.id}</span>
                            </div>
                            <div className="flex w-1/2 justify-end">
                                <div className="flex w-80 items-center">
                                    <button 
                                        className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                        onClick={() => editarNombreCategorias(categoria.id)}
                                    >
                                    Editar
                                    </button>
                                    <button 
                                        className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                                        onClick={() => eliminarCategoria(categoria.id)}
                                    >
                                    Eliminar 
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-end justify-center w-20 h-20 pb-1 fixed button-0 bg-green-500 hover:bg-green-700 right-4 bottom-4  rounded-full text-8xl text-gray-50 cursor-pointer"
                                onClick={() => agregarCategoria()}
                            >
                                +
                            </div>
                        </div>
                    ))
                    }
                    {/* Fin contenedor separado del buscador */}
                    </div>
                    
                </div>

                // Fin de vista de Categorias
                }

                
                {
                // Inicio de vista de Servicios
                vistaUsuarios === "servicios" &&
                <div className="w-full flex flex-col border-2">
                    <div className="w-full h-20 fixed"> 
                        {/* Inicio de Buscador */}
                        <div className="flex flex-row w-full py-1 filter drop-shadow-md bg-white">
                                <div className="w-1/2 my-2 px-4 flex items-center">
                                    <input
                                        className="border border-gray-400 p-2 rounded-md font-medium w-1/2" 
                                        type="text"
                                        id="lastName"
                                        onChange={() => {}}
                                        name="lastName"
                                        placeholder="Busca por nombre de servicio"
                                    />
                                </div>
                                <div className="flex w-96 ml-4 justify-end items-center pr-2">
                                    <div className="w-14 h-14 rounded-full bg-green-400" style={{backgroundImage: `url(${ImagenPerfil})`, backgroundSize: "cover"}} >
                                    </div>
                                </div>
                            </div>
                        {/* Fin Buscador */}
                        </div>
                        {/* Inicio contenedor separado del buscador */}
                        <div className="mt-20 w-full">
                            {
                                servicios?.map(servicio => (
                                    <div className="w-full flex border-2 items-center py-4 px-4 my-2">
                                        <div className="flex flex-col w-1/2">
                                            <h2 className="text-2xl font-semibold font-sans">{servicio.title}</h2>
                                            <span className="text-gray-700 font-sans font-semibold text-sm ">{`Precio: ${servicio.min} - ${servicio.max} (${servicio.currency})`}</span>
                                            <span className="text-gray-700 font-sans font-semibold text-sm ">ID: {servicio.id}</span>
                                        </div>
                                        <div className="flex w-1/2 justify-between">
                                            <div className="flex flex-col w-20 justify-center items-center">
                                                <div className="flex items-center">
                                                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                                                    <h2 className="font-semibold text-lg">Estado</h2>
                                                </div>
                                                <span className="text-sm">Activo</span>
                                            </div>
                                            <div className="flex w-80 items-center">
                                                <button 
                                                    className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-blue-800 hover:bg-blue-900 text-gray-50"
                                                    onClick={() => mostrarDescripcion(servicio)}
                                                >
                                                Ver descripción
                                                </button>
                                                <button 
                                                    className="mx-2 flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-red-800 hover:bg-red-900 text-gray-50"
                                                    onClick={() => eliminarServicio(servicio.id)}
                                                >
                                                Eliminar 
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        {/* Fin contenedor separado del buscador */}
                        </div>
                    </div>
                    // Fin de vista de Servicios
                }
                </div>
        </div>
    )
}

export default ControlPanel;