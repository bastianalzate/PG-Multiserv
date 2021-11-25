/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import { getCats, servicesId, updateService } from '../../redux/actions/actions';
import ReactCountryFlag from "react-country-flag"
import { storage } from "../../Firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { IoReturnUpBack } from "react-icons/io5";
import { HiOutlinePhotograph, HiPencil } from "react-icons/hi";
import { BsCloudArrowUpFill, BsCloudCheckFill } from "react-icons/bs";
import { FaPlus, FaTimes } from "react-icons/fa";
import ListBox from '../../Components/HeadLess/ListBox/ListBox';
import { toast } from 'react-toastify';
import { RiLoaderFill } from "react-icons/ri";

const EditarServicio = () => {
  /*
  Modificar en caso de ser necesario el state 'servicio' por el servicio traido con el id, linea 121
  función 'saveEdit' para actualizar los datos del servicio en línea 152

  datos que reciben los inputs = {
    title: "titulo del servicio",
    id: 11,
    categorias: ["Limpieza"],
    currency: 'MXN',
    description: "Datos",
    estadoDePago: 'Aprobado',
    max: 250,
    min: 20
  }
  */
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoriasDb = useSelector((state) => state.categories)
  const servicioAntiguo= useSelector((state) => state.detalleServicio)
  const loadingService = useSelector((state)=> state.loadingServicesDetalle)

  /*BOOLEANO QUE MUESTRA/OCULTA LOS INPUTS*/
  const [editing, setEditing] = useState(false)

  /*OBJETO QUE RECIBE LA IMAGEN DE PORTADA:
  {
    url: URL.createObjectURL(e.target.files[0]),
    img: e.target.files[0],
    status: 'pending'
  }
  */
  const [cover, setCover] = useState(null)

  const [allowLoadImg, setAllowLoadImg] = useState(true)
  const [loadedImg, setLoadedImg] = useState(false)
  const [subiendoPortada, setsubiendoPortada] = useState(false)

  //traer datos del usuario
  let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
  var uid = ""
  if (localStorage.length > 0 && datosSesionFromLocalStorage.uid) {
      uid= datosSesionFromLocalStorage.uid
  }

  

  /*ARRAY DE OBJETOS QUE RECIBE HASTA 6 IMÁGENES ADICIONALES PARA SUBIR*/
  const [additionalImg, setAdditionalImg] = useState([])

  /*OPCIONES PARA SELECT DE MONEDAS --- NO MODIFICAR ---*/
  const monedas = [
    {
      name: 'MXN',
      icon: <ReactCountryFlag

        countryCode="MX"
        style={{
          width: '18px',
          height: '18px',
          alignSelf: 'center'
        }}
        svg
      />
    },
    {
      name: 'ARS',
      icon: <ReactCountryFlag

        countryCode="AR"
        style={{
          width: '18px',
          height: '18px',
          alignSelf: 'center'
        }}
        svg
      />
    },
    {
      name: 'COP',
      icon: <ReactCountryFlag

        countryCode="CO"
        style={{
          width: '18px',
          height: '18px',
          alignSelf: 'center'
        }}
        svg
      />
    },
  ]

  /* MOCKING DE LOS DATOS DEL SERVICIO QUE DEBERÍA LLEGAR POR ID */
  // const dataServ = {
  //   title: "Un serviciooooo",
  //   id: 11,
  //   categorias: [
  //     {
  //       id: 7,
  //       title: 'Mantenimiento'
  //     }
  //   ],
  //   currency: 'MXN',
  //   description: "Praesent sed urna vel ex dictum pulvinar. Integer fermentum, libero non ultricies posuere, nunc massa convallis nisl, id placerat tortor urna ut mauris. Cras id ante non neque mattis sagittis. Mauris facilisis nisi vitae massa porta egestas. Ut eros sem, hendrerit ac aliquam in, lacinia eget turpis. Quisque viverra, mi nec accumsan consequat, velit leo consectetur ligula, sit amet aliquam odio elit at augue. Nam massa est, imperdiet at laoreet non, blandit eu purus. Ut tellus orci, porttitor mattis turpis auctor, porttitor suscipit ante. Curabitur lacus justo, lacinia sit amet magna in, auctor malesuada lorem. In vulputate lobortis nisl et suscipit.",
  //   estadoDePago: 'Aprobado',
  //   max: 250,
  //   min: 20,
  //   nameUser: 'Shandee Hanbury-Brown',
  //   photos: ['https://klservicios.com/images/portfolio/interior.png'],
  //   profilePic: "http://dummyimage.com/420x600.png/5fa2dd/ffffff",
  //   usuarioUidClient: "18Ixm0v0hsWQDo6lPbYR0SnMPry2"

  // }

  /*GUARDAMOS TEMPORALMENTE EL MOCKING DEL DATO DEL SERVICIO*/
  const servicio =servicioAntiguo[0]

  /*STATE QUE GUARDA TEMPORALMENTE LOS INPUTS DE EDITAR SERVICIO ANTES DE ACTUALIZARLOS*/
  const [editService, setEditService] = useState(servicio)

  useEffect(() => {
    dispatch(getCats())
    dispatch(servicesId(id))
    document.title = "Editar servicio"
    /*OBTENEMOS LAS CATEGORÍAS INCLUSO DESPUÉS DE RECARGAR LA PÁGINA*/
    if (!localStorage.length || !datosSesionFromLocalStorage.emailVerified) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (additionalImg.length >= 6) {
      setAllowLoadImg(false)
    } else {
      setAllowLoadImg(true)
    }
  }, [allowLoadImg, additionalImg])

  useEffect(() => {
    if(subiendoPortada){
      //hacer el dispatch a la accion
      dispatch(updateService(id, editService));
      setsubiendoPortada(false);
    }
  }, [subiendoPortada, editService])

  const removeImg = (index) => {
    const arr = additionalImg.filter((img, i) => {
      if (i !== index) return img
    })
    if (additionalImg.length === 1) {
      setAdditionalImg([])
    }
    else {
      setAdditionalImg(arr)
    }
  }

  const saveEdit = () => {
    /*ACTUALIZAR AQUÍ LOS DATOS DEL SERVICIO */
    //...
    // setServicio(editService)

    setEditing(false)
  }

  const cancelEdit = () => {
    setEditing(false)
  }

  /*OBTENEMOS EL VALOR DE LOS INPUTS EN EL STATE 'editService' */
  const handleEdit = (e) => {
    let value = e.target.value
    if (e.target.name === 'max' || e.target.name === 'min' || e.target.name === 'id') {
      value = Number(value)
    }
    setEditService({
      ...editService,
      [e.target.name]: value
    })
  }

  /*RECIBIMOS POR INPUT LA IMAGEN DE PORTADA A ACTUALIZAR*/
  const handleCover = async (e) => {
    setCover({
      url: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      status: 'pending'
    })
    setLoadedImg(true);
  }



  /*ACTUALIZAMOS LA PORTADA EN FIREBASE*/
  const uploadPortada = async () => {
    const notification = toast.loading("☁️ Cargando portada...", {
      isLoading: true,
      position: "top-center",
      hideProgressBar: false,
      pauseOnHover: false,
    })
    setCover({
      ...cover,
      status: 'uploading'
    })
    let coverToLoad = cover.img

    try {
      const formato= coverToLoad.name.slice((Math.max(0, (coverToLoad.name).lastIndexOf('.')) || Infinity)+ 1);
      const fileRef = ref(storage, `/PhotosServices/${id}/portada.${formato}`);
      await uploadBytes(fileRef, coverToLoad);
      const urlDownload = await getDownloadURL(fileRef);

      setCover({
        ...cover,
        url: urlDownload,
        status: 'uploaded'
      })

      setLoadedImg(false)
      toast.update(notification, {
        render: '¡Se actualizó la portada!',
        type: 'success',
        isLoading: false,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      })

      setEditService({
        ...editService,
        photos: [urlDownload, ...editService.photos]
      })
      setsubiendoPortada(true);
    } catch (error) {
      setCover({
        ...cover,
        status: 'failed'
      })
      toast.update(notification, {
        render: 'No se pudo actualizar la portada, intenta de nuevo',
        type: 'error',
        isLoading: false,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      })
    }
  }

  /*RECIBIMOS LAS IMÁGENES ADICIONALES POR INPUTS*/
  const handleImages = async (e) => {
    setAdditionalImg([{
      img: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
      status: 'pending'
    }, ...additionalImg])
  }

  /*ACTUALIZAMOS LAS IMÁGENES DE ACUERDO A SU ÍNDICE EN FIREBASE --- additionalImg = [] ---*/
  const handleUpload = async (index) => {
    // cargarlo a firebase storage
    const notification = toast.loading("☁️ Cargando imagen...", {
      isLoading: true,
      position: "top-center",
      hideProgressBar: false,
      pauseOnHover: false,
    })
    const findImage = additionalImg.filter((img, i) => {
      if (i === index) return img
    })
    let imageToLoad = findImage[0].img
    setAdditionalImg(additionalImg.map((img, i) => {
      if (i === index) {
        img.status = 'uploading'
      }
      return img
    }))
    try {
      const formato2= imageToLoad.name.slice((Math.max(0, (imageToLoad.name).lastIndexOf('.')) || Infinity)+ 1);
      const fileRef = ref(storage, `/PhotosServices/${id}/imagen${index+1}.${formato2}`);
      await uploadBytes(fileRef, imageToLoad);
      //obtener url de descarga
      const urlDownload = await getDownloadURL(fileRef);

      setAdditionalImg(additionalImg.map((img, i) => {
        if (i === index) {
          img.url = urlDownload
          img.status = 'uploaded'
        }
        return img
      }))
      toast.update(notification, {
        render: '¡Se cargó la imagen!',
        type: 'success',
        isLoading: false,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      })
    } catch (err) {
      setAdditionalImg(additionalImg.map((img, i) => {
        if (i === index) {
          img.status = 'failed'
        }
        return img
      }))
      toast.update(notification, {
        render: 'No se pudo cargar la imagen',
        type: 'error',
        isLoading: false,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      })
    }

  }

  const resetImg = () => {
    setLoadedImg(false)
    setCover(null)
  }

  const gradientStyle = {
    background: 'rgb(2,0,36)',
    background: 'linear-gradient(0deg, rgba(0,0,0,0) 18%, rgba(0,0,0,0.13209033613445376) 37%, rgba(0,0,0,0.9051995798319328) 97%)'

  }
  return (
    <div className="w-full h-screen overflow-y-auto flex flex-col"> {loadingService? <div>Cargando...</div>:
      <div>{servicio.usuarioUidClient !== uid? <div>No eres propietario de ese servicio</div>:
      <div className="w-full h-screen overflow-y-auto flex flex-col">
        <div css={{ height: '30rem' }} className="w-full relative">
          <img
            css={{ height: '30rem' }}
            alt="portada"
            src={cover? cover.url : servicio.photos[0]}
            className={`object-cover w-full`}
          />
          <div css={gradientStyle} className="w-full h-48 absolute top-0">
            <div className="flex flex-row justify-between mx-8 mt-2">
              <Link to="/home" className="inline-flex px-4 py-0.5 bg-transparent rounded-full text-white transition-all ease-in-out duration-300 hover:bg-gray-900">
                <IoReturnUpBack className="mr-3 self-center text-xl" />
                <span className="font-semibold">Regresar</span>
              </Link>
              <div className="self-center">
                {loadedImg ?
                  <div className="inline-flex">
                    <button disabled={cover.status === 'uploading'} onClick={uploadPortada} className="cursor-pointer inline-flex px-4 py-0.5 bg-transparent rounded-full bg-green-100 text-green-900 transition-all ease-in-out duration-300 hover:bg-green-800 hover:text-white disabled:opacity-50">
                      {cover.status === 'uploading' ? <RiLoaderFill className="mr-3 self-center text-xl animate-spin" /> : <BsCloudArrowUpFill className="mr-3 self-center text-xl" />}
                      <span className="font-semibold">{cover.status === 'uploading' ? 'Cargando portada...' : 'Confirmar'}</span>
                    </button>
                    {(cover && (cover.status === 'pending' || cover.status === 'failed')) && <button onClick={resetImg} className="cursor-pointer inline-flex px-4 py-0.5 bg-transparent rounded-full bg-red-200 text-red-900 transition-all ease-in-out duration-300 hover:bg-red-800 hover:text-white ml-3">
                      <FaTimes className="mr-3 self-center text-xl" />
                      <span className="font-semibold">Cancelar</span>
                    </button>}
                  </div>
                  :
                  <>
                    <input
                      onChange={handleCover}
                      type="file"
                      name="portada"
                      id="portada"
                      accept="image/jpeg"
                      className="inputfile"
                    />
                    <label htmlFor="portada" className="cursor-pointer inline-flex px-4 py-0.5 bg-transparent rounded-full text-white transition-all ease-in-out duration-300 hover:bg-gray-900">
                      <HiOutlinePhotograph className="mr-3 self-center text-xl" />
                      <span className="font-semibold">Editar portada</span>
                    </label>
                  </>}
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto w-full  mt-8 px-8  lg:px-16 xl:px-32" >
          <div id="photos-and-edit" className="flex flex-row justify-between  w-full border-b">
            <div id="add-photos" className="flex flex-col w-full h-72 mb-2 overflow-x-auto">
              <h2 className="text-4xl font-semibold text-cyan-900 mb-4 self-start">
                Imágenes adicionales
              </h2>
              <div className="flex w-full flex-row">
                {allowLoadImg && <div className="mx-3 py-4">
                  <input
                    onChange={handleImages}
                    type="file"
                    name="foto5"
                    id="foto5"
                    accept="image/png, image/jpeg"
                    className="inputfile" />

                  <label htmlFor="foto5" className="hover:border-transparent hover:shadow-lg hover:bg-white focus:outline-none rounded-lg border-2 border-dashed text-indigo-300 border-indigo-200 hover:text-green-600 flex flex-col items-center text-center justify-center p-4 mx-0 sm:mr-4 mb-2 sm:mb-0 transition-all duration-500 ease-in-out cursor-pointer w-40 h-40">
                    <FaPlus className="text-4xl" />
                    <span className="google-sans font-semibold block">Haz click para agregar una foto</span>
                  </label>
                </div>}

                {additionalImg.length ?
                  additionalImg.map((img, index) => {
                    return (<div className="relative flex-shrink-0  mx-3 my-4 w-40 h-40" key={index}>
                      <div className="absolute top-0 right-0 z-20">
                        {(img.status === 'pending' || img.status === 'failed') && <button
                          className="p-2"
                          onClick={() => removeImg(index)}
                        >
                          <FaTimes className="text-lg text-white" />
                        </button>}
                      </div>
                      <div css={{ backgroundColor: "#00000063" }} className="absolute w-full h-full rounded-md z-10 flex justify-center items-center m-auto top-0 left-0 bottom-0 right-0">
                        <div className="relative">
                          {<div style={{ animation: img.status === 'uploading' ? 'spin 5s linear infinite' : 'none' }} className={`border-2 ${img.status === 'uploading' && 'border-dashed'} w-16 h-16 rounded-full ${img.status === 'failed' && 'border-red-800'} ${img.status === 'uploaded' && 'border-pureGreen-200'}`}>
                          </div>}
                          <button
                            onClick={() => { handleUpload(index) }}
                            disabled={(img.status === 'uploading' || img.status === 'uploaded')}
                            className={`flex justify-center items-center absolute w-16 h-16 m-auto top-0 left-0 rounded-full text-white text-3xl ${(img.status === 'uploading' || img.status === 'uploaded') && 'cursor-not-allowed'} `}>
                            {img.status === 'uploaded' ? <BsCloudCheckFill className="self-center text-pureGreen-400" />
                              : <BsCloudArrowUpFill className="self-center" />}
                            {/* {img.status === 'failed' && <AiFillExclamationCircle />} */}
                          </button>
                        </div>
                      </div>
                      <img
                        key={index}
                        alt={`imagen adicional ${index + 1}`}
                        src={img.url}
                        className="w-40 h-40 rounded-md object-cover"
                      />
                    </div>)
                  }) : ''
                }
              </div>
            </div>
            <div id="edit-buttons"
              className="flex flex-col w-72 px-4"
              css={{
                boxShadow: '-31px 0px 27px -32px rgba(0,0,0,0.29)',
                WebkitBoxShadow: '-31px 0px 27px -32px rgba(0,0,0,0.29)'
              }}
            >
              <h2 className="text-4xl font-semibold text-cyan-900 mb-4 self-start">
                Opciones
              </h2>
              <div

                className="h-full">
                {editing ?
                  <div>
                    <button
                      onClick={cancelEdit}
                      className="inline-flex flex-shrink-0 justify-center px-3 rounded-lg font-semibold text-lg place-self-center self-center bg-red-200 text-red-900 transition-all ease-in-out duration-300 hover:bg-red-800 hover:text-white my-2">
                      <FaTimes className="mr-2 self-center text-xl" />
                      <span className="font-semibold">Cancelar edición</span>
                    </button>
                    <button
                      onClick={saveEdit}
                      className="inline-flex flex-shrink-0  justify-center px-3 rounded-lg font-semibold text-lg place-self-center self-center bg-green-100 text-green-900 transition-all ease-in-out duration-300 hover:bg-green-800 hover:text-white my-2">
                      <BsCloudArrowUpFill className="mr-2 self-center text-xl" />
                      <span className="font-semibold">Guardar cambios</span>
                    </button>
                  </div>
                  :
                  <button
                    onClick={() => { setEditing(true) }}
                    className="inline-flex flex-shrink-0 justify-center px-3 rounded-lg font-semibold text-lg place-self-center self-center bg-blue-800 hover:bg-blue-900 text-white transition-all ease-in-out duration-300 mt-2">
                    <HiPencil className="self-center text-lg mr-2" />
                    <span>Editar publicación</span>
                  </button>}
              </div>
            </div>
          </div>
          {editing ?
            <div id="edit-all" className="flex flex-col justify-center items-start mt-4">

              <div className="flex flex-row w-full ">
                <div className="flex flex-col justify-start items-start w-full lg:pr-16">
                  <label htmlFor="titleEdit" className="text-4xl font-semibold text-cyan-900 cursor-pointer ">Editar título:</label>
                  <input
                    type="text"
                    name="title"
                    id="titleEdit"
                    placeholder="Agrega un título..."
                    value={editService.title}
                    onChange={handleEdit}
                    className="focus:outline-none  font-semibold text-xl text-gray-900 w-full border-b-2 border-gray-900 mt-4" />
                  <div className="mt-6 w-full">
                    <label htmlFor="descrEdit" className="text-4xl font-semibold text-cyan-900 cursor-pointer">Editar descripción:</label>
                    <textarea
                      css={{ resize: "none" }}
                      placeholder="Agrega una descripción..."
                      type="text"
                      name="description"
                      id="descrEdit"
                      value={editService.description}
                      onChange={handleEdit}
                      className="focus:outline-none  font-semibold text-xl text-gray-900 align-text-bottom border-2 rounded-md border-gray-900 mt-4 w-full h-96 py-2 px-6" />
                  </div>
                </div>
                <div className="flex flex-col w-96 ">
                  <span className="text-4xl font-semibold text-cyan-900 text-left mb-4">
                    Más detalles
                  </span>
                  {categoriasDb.length
                    ?
                    <div className="my-2">
                      <h2 className="font-semibold text-xl text-gray-600 mb-2">Categoría:</h2>
                      <ListBox
                        defaultValue={editService.categorias[0].title}
                        customBorder="#9CA3AF"
                        className="self-center"
                        width='15rem'
                        options={categoriasDb}
                        callBack={(text) => {
                          setEditService({
                            ...editService,
                            categorias: [text.name]
                          })
                        }}
                        text="..."
                        theme="#0C4A6E"
                        includeIconOnDesc
                      />
                    </div>
                    :
                    <div className="rounded-lg text-center mb-2 px-4 py-1 bg-teal-100 text-cyan-900">
                      <span className="font-semibold">
                        {  servicio.categorias[0].title}
                      </span>
                    </div>
                  }
                  <div className="my-2">
                    <h2 className="font-semibold text-xl text-gray-600 mb-2">Moneda local:</h2>
                    <ListBox
                      customBorder="#9CA3AF"
                      className="self-center"
                      width='15rem'
                      options={monedas}
                      callBack={(curr) => {
                        setEditService({
                          ...editService,
                          currency: curr.name
                        })
                      }}
                      text="..."
                      theme="#0C4A6E"
                      includeIconOnDesc
                    />
                  </div>

                  <div className="mt-2 mb-4 flex flex-col">
                    <label htmlFor="priceMin" className="text-xl text-cyan-900 font-semibold">Precio mínimo:</label>
                    <div className="flex flex-row">
                      <span className="text-lg text-gray-600 font-semibold mr-2">$</span>
                      <input
                        type="number"
                        name="min"
                        id="priceMin"
                        value={editService.min}
                        onChange={handleEdit}
                        className="focus:outline-none w-28  font-semibold text-xl text-gray-900 border-b-2 border-gray-900"
                      />
                      <span className="ml-2 underline text-lg text-gray-700 font-semibold">{editService.currency} </span>
                    </div>
                  </div>

                  <div className="mb-2 flex flex-col">
                    <label htmlFor="priceMax" className="text-xl text-cyan-900 font-semibold">Precio máximo:</label>
                    <div className="flex flex-row">
                      <span className="text-lg text-gray-600 font-semibold mr-2">$</span>
                      <input
                        type="number"
                        name="max"
                        id="priceMax"
                        value={editService.max}
                        onChange={handleEdit}
                        className="focus:outline-none w-28  font-semibold text-xl text-gray-900 border-b-2 border-gray-900"
                      />
                      <span className="ml-2 underline text-lg text-gray-700 font-semibold">{editService.currency} </span>
                    </div>
                  </div>


                </div>
              </div>
            </div>
            :
            <div id="content" className="flex flex-col">
              <div className="flex flex-row w-full mt-4">
                <div className="flex flex-col items-start w-full pr-12">
                  <span className="text-4xl font-semibold text-cyan-900 text-left mb-4">
                    {  servicio.title}
                  </span>
                  <p className="font-semibold text-gray-900 px-4">{  servicio.description}</p>
                </div>

                <div className="flex flex-col w-96 ">
                  <span className="text-4xl font-semibold text-cyan-900 text-left mb-4">
                    Más detalles
                  </span>
                  <div className="rounded-lg text-center mb-2 px-4 py-1 bg-teal-100 text-cyan-900">
                    <span className="font-semibold">
                      {  servicio.categorias[0].title}
                    </span>
                  </div>
                  <div className="mb-2 flex flex-col px-4">
                    <span className="text-xl text-cyan-900 font-semibold">Precio mínimo:</span>
                    <span className=" underline text-lg text-gray-700 font-semibold"> ${  servicio.min.toFixed(2)} {  servicio.currency} </span>
                  </div>
                  <div className="mb-2 flex flex-col px-4">
                    <span className="text-xl text-cyan-900 font-semibold">Precio máximo:</span>
                    <span className=" underline text-lg text-gray-700 font-semibold"> ${  servicio.max.toFixed(2)} {  servicio.currency} </span>
                  </div>

                </div>
              </div>

              <div className="mt-4 flex flex-row">

              </div>
            </div>}
        </div>
      
      
        </div>}
        </div>}
    </div>
  );
};

export default EditarServicio; 