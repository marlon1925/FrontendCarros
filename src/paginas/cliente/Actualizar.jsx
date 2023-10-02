import { Formulario } from '../../componets/Formulario'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../../componets/Alertas/Mensaje';
import axios from 'axios';



const Actualizar = () => {
    const { id } = useParams()
    const [paciente, setPaciente] = useState({})
    const [mensaje, setMensaje] = useState({})
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const consultarPaciente = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setPaciente(respuesta.data);
                setIsEditMode(true); // Establecer el modo de edición en true
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarPaciente()
    }, [])


    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Updated Patient</h1>
            <hr className='my-4' />
            <p className='mb-8'>This module allows you to update the data of a registered patient</p>
            {
                Object.keys(paciente).length != 0 ?
                    (
                        <Formulario paciente={paciente} isEditMode={isEditMode}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
        </div>

    )
}

export default Actualizar