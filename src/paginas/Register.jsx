import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Mensaje from '../componets/Alertas/Mensaje';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const Register = () => {
    const navigate = useNavigate();
    // Inicializa useForm para gestionar el formulario
    const {
        handleSubmit,
        control, // Controla los campos del formulario
        formState: { errors }, // Gestiona los errores
    } = useForm();

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
    });

    const [mensaje, setMensaje] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            if (!validatePassword(data.password)) {
                setMensaje({ respuesta: 'The password does not meet the minimum requirements', tipo: false });
                return;
            }

            const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
            const respuesta = await axios.post(url, data);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });

            // Restablece el estado del formulario
            setForm({
                nombre: '',
                apellido: '',
                email: '',
                password: '',
            });
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    // Función para validar la contraseña
    const validatePassword = (password) => {
        // Requiere al menos 8 caracteres
        if (password.length < 8) {
            return false;
        }

        // Requiere al menos una mayúscula
        if (!/[A-Z]/.test(password)) {
            return false;
        }

        // Requiere al menos un carácter especial (puedes personalizar esta expresión regular)
        if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password)) {
            return false;
        }

        return true;
    };


    return (
        <>

            <div className="bg-white flex justify-center items-center w-1/2">
                <div className="md:w-4/5 sm:w-full">
                    {Object.keys(mensaje).length > 0 && (
                        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )}
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">
                        Bienvenido
                    </h1>
                    <small className="text-gray-400 block my-4 text-sm">
                        Por favor, ingrese sus datos
                    </small>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label
                                htmlFor="nombre"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Nombre:
                            </label>
                            <Controller
                                name="nombre"
                                control={control}
                                defaultValue={form.nombre}
                                rules={{
                                    required: 'Required field',
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: 'Only letters are accepted',
                                    },
                                }}
                                render={({ field }) => (
                                    <div className="mb-3">
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name"
                                            maxLength={20}
                                            className={`block w-full rounded-md border ${errors.nombre ? 'border-red-500' : 'border-gray-300'
                                                } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                            required
                                        />
                                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="mb-2 block text-sm font-semibold"
                                htmlFor="apellido"
                            >
                                Apellido:
                            </label>
                            <Controller
                                name="apellido"
                                control={control}
                                defaultValue={form.apellido}
                                rules={{
                                    required: "Required field",
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: 'Only letters are accepted',
                                    },
                                }}
                                render={({ field }) => (
                                    <div className="mb-3">
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your last name"
                                            maxLength={20}
                                            className={`block w-full rounded-md border ${errors.apellido ? "border-red-500" : "border-gray-300"
                                                } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                            required
                                        />
                                        {errors.apellido && (
                                            <p className="text-red-500 text-sm">{errors.apellido.message}</p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>


                        <div className="mb-3">
                            <label
                                className="mb-2 block text-sm font-semibold"
                                htmlFor="email"
                            >
                                Correo electronico:
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue={form.email}
                                rules={{
                                    required: "Required field",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Maximum length reached",
                                    },
                                }}
                                render={({ field }) => (
                                    <div className="mb-3">
                                        <input
                                            {...field}
                                            type="email"
                                            placeholder="Enter your email"
                                            maxLength={100}
                                            className={`block w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"
                                                } focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="mb-2 block text-sm font-semibold"
                                htmlFor="password"
                            >
                                Contraseña:
                            </label>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue={form.password}
                                rules={{
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters long',
                                    },
                                    validate: {
                                        hasUppercase: (value) => {
                                            if (!/(?=.*[A-Z])/.test(value)) {
                                                return 'Password must contain at least one uppercase letter';
                                            }
                                            return true;
                                        },
                                        hasSpecialCharacter: (value) => {
                                            if (!/(?=.*[^A-Za-z0-9])/.test(value)) {
                                                return 'Password must contain at least one special character';
                                            }
                                            return true;
                                        },
                                    },
                                }}
                                render={({ field }) => (
                                    <div className="mb-3 relative">
                                        <div className="flex">
                                            <input
                                                {...field}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="********************"
                                                className={`flex-grow rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                                    } focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500`}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="ml-2 flex items-center justify-center focus:outline-none"
                                            >
                                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                                        )}
                                    </div>
                                )}
                            />


                        </div>

                        <div className="mb-3">
                            <button className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
                                Registrarse
                            </button>
                        </div>
                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4 "></div>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>¿Tienes una cuenta?</p>
                        <Link
                            to="/login"
                            className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 "
                        >
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
























