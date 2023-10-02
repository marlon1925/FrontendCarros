import { useContext, useState } from "react";
import Mensaje from "../Alertas/Mensaje";
import AuthContext from "../../context/AuthProvider";
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Password = () => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const { actualizarPassword } = useContext(AuthContext);
    const [mensaje, setMensaje] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        if (data.passwordactual === "" || data.passwordnuevo === "") {
            setMensaje({ respuesta: "All fields must be entered", tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
            return;
        }

        if (data.passwordnuevo.length < 6) {
            setMensaje({ respuesta: "The password must have a minimum of 6 characters", tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
            return;
        }

        const resultado = await actualizarPassword(data);
        setMensaje(resultado);
        setTimeout(() => {
            setMensaje({});
        }, 3000);
        reset();
    };
   
    return (
        <>
            <div className='mt-5'>
                <h1 className='font-black text-4xl text-gray-500'>Password</h1>
                <hr className='my-4' />
                <p className='mb-2'>This module allows you to update the user's password</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <div>
                    <label
                        htmlFor='passwordactual'
                        className='text-gray-700 uppercase font-bold text-sm'>Current password:
                    </label>
                    <div className="relative">
                        <Controller
                            name="passwordactual"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id='passwordactual'
                                    type={showPassword ? 'text' : 'password'}
                                    className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.passwordactual ? 'border-red-500' : 'border-gray-300'
                                        } pr-10`}
                                    placeholder='**************'
                                    {...field}
                                />
                            )}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center justify-center focus:outline-none pr-2"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                    </div>
                </div>



                <div>
                    <label
                        htmlFor='passwordnuevo'
                        className='text-gray-700 uppercase font-bold text-sm'>New password: </label>
                    <div className="flex">
                        <Controller
                            name="passwordnuevo"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'New password is required',
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
                                <input
                                    id='passwordnuevo'
                                    type={showPassword ? 'text' : 'password'}
                                    className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.passwordnuevo ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder='**************'
                                    {...field}
                                />
                            )}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="ml-2 flex items-center justify-center focus:outline-none"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                        {errors.passwordnuevo && (
                            <p className="text-red-500 text-sm">{errors.passwordnuevo.message}</p>
                        )}
                    </div>
                </div>

                <input
                    type="submit"
                    className='bg-gray-800 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-600 cursor-pointer transition-all'
                    value='Actualizar' />
            </form>
        </>
    );
};

export default Password;
