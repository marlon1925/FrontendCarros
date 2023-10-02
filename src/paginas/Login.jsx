import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from '../context/AuthProvider'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

    const navigate = useNavigate();
    const { setAuth, setEstado } = useContext(AuthContext);
    const [error, setError] = useState(""); // Nuevo estado para el mensaje de error
    const [mensaje, setMensaje] = useState({});
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
            const respuesta = await axios.post(url, data);
            localStorage.setItem('token', respuesta.data.token);
            setAuth(respuesta.data);
            navigate('/dashboard');
        } catch (error) {
            if (mensaje.response && mensaje.response.status === 404) {
                // Cuenta no encontrada, muestra un mensaje de error
                setMensaje({
                    respuesta: "La cuenta ya existe",
                    tipo: false,
                });
            } else {
                // Otro tipo de error, muestra el mensaje de error estándar
                setError(error.response.data.msg || "Something went wrong."); // Puedes proporcionar un mensaje por defecto aquí
            }

            // Limpia el mensaje de error después de un tiempo
            setTimeout(() => {
                setMensaje({}); // Limpia el estado mensaje
                setError(""); // Limpia el estado error
            }, 3000);
        }
    };

    return (
        <>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}


            <div className="w-1/2 h-screen bg-white flex justify-center items-center">

                <div className="md:w-4/5 sm:w-full">
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">Bienvenido</h1>
                    <small className="text-gray-400 block my-4 text-sm">Ingresa tus credenciales</small>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Required field',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email'
                                }
                            }}
                            render={({ field }) => (
                                <div className="mb-3">
                                    <label className="mb-2 block text-sm font-semibold">Email</label>
                                    <input
                                        {...field}
                                        type="email"
                                        placeholder="Enter your email"
                                        maxLength={150}
                                        className={`block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500`}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Required field' }}
                            render={({ field }) => (
                                <div className="mb-3">
                                    <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                                    <div className="relative">
                                        <input
                                            {...field}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="********************"
                                            className={`block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                </div>
                            )}
                        />


                        <div className="my-4">
                            <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Login</button>
                        </div>
                    </form>

                    {error && (
                        <div className="text-red-500 text-sm mt-2">
                            {error}
                        </div>
                    )}
                    <div className="mt-5 text-xs border-b-2 py-4 ">
                        <Link to="/forgot/id" className="underline text-sm text-gray-400 hover:text-gray-900">¿Olvidaste tu contraseña?</Link>
                    </div>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>No tengo una cuenta</p>
                        <Link to="/register" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Registrase</Link>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Login
