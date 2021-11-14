/* Atoms */
import LinkTo from '../../Components/Atoms/LinkTo/LinkTo'
/* Organisms */
import Nav from "../../Components/Organisms/NavBar/Nav"
/* Assets */
import Img from '../../assets/Icons/ICONO.png'
/* Icon */
import { AiFillHome, AiFillCalendar } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
/* React Hooks */
import { useEffect } from 'react';
/* React redux */
import { useSelector, useDispatch } from 'react-redux'
import { services } from '../../redux/actions/actions';

const Home = () => {
    const servicios = useSelector((state) => state.servicios)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(services())
        console.log(servicios)
    }, [])

    let datosSesionFromLocalStorage = JSON.parse(localStorage.getItem("datoSesion"))
    var foto = Img
    if(localStorage.length>0 && datosSesionFromLocalStorage.photoURL){
        console.log("entra",datosSesionFromLocalStorage)
         foto = datosSesionFromLocalStorage.photoURL
     }
    // si necesitan datos de la sesión se encuentran en la variable datosSesionFromLocalStorage
    const arr = [
        <LinkTo linkClass='m-4 flex justify-center' page='home' render={<AiFillHome size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='home/chat' render={<BsFillChatDotsFill size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='home/profile' render={<FaUserAlt size='28' color='white' />} />,
        <LinkTo linkClass='m-4 flex justify-center' page='home/schedule' render={<AiFillCalendar size='30' color='white' />} />
    ]

    return (
        <div>
            <Nav clase='w-20 h-screen p-4 pt-6 flex flex-col justify-between justify-center bg-blue-900' imgClass='w-16' imagen={foto} imgName='Logo' arr={arr} />
        </div>
    )
}

export default Home