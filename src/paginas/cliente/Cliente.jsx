import React, { useState } from 'react'
import { CardPerfil } from '../../componets/Perfil/CardPerfil'
import FormularioPerfil from '../../componets/Perfil/FormularioPerfil'
import Password from '../../componets/Perfil/Password'
import { Link } from 'react-router-dom'
import { FormularioCliente } from '../../componets/FormularioCliente'

const Cliente = () => {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <>
            <div className="flex justify-center gap-x-4 my-4">
                <Link to="/dashboard/formulario" className="bg-blue-500 px-4 py-2 text-white rounded">Crear</Link>

                <Link to="/dashboard/listarClientes" className="bg-yellow-500 px-4 py-2 text-white rounded">
                    Enlistar
                </Link>

            </div>
            <FormularioCliente isEditMode={isEditMode} />
        </>
    )
}

export default Cliente