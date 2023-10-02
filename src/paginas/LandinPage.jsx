import logoDarkMode from '../assets/dark.png'
import logoFacebook from '../assets/facebook.png'
import logoTortuga from '../assets/Image_extra.png'
import logoGato from '../assets/gato_vet.png'
import logoPerro from '../assets/perro_vet.png'
import logoConejo from '../assets/conejo_vet.png'
import logoCanario from '../assets/canario_vet.png'
import logoVeterinaria from '../assets/veterinaria.jpg'
import logoInstagram from '../assets/instagram.png'
import logoTiktok from '../assets/tik-tok.png'
import logoTitwer from '../assets/twitter.png'

import { useState } from 'react'
import { Link } from 'react-router-dom'

export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false)
    return (
        <div className={darkMode ? "dark" : ""}>

            <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
                <section>

                    <nav className='p-10 mb-12 flex justify-between items-center'>
                        <div className='flex items-center space-x-4'>
                            <h1 className='text-4xl font-extrabold dark:text-white text-teal-500 tracking-wide'>ECUA-PETS</h1>
                            <img src={logoTortuga} alt="logo-vet" width={60} height={60} className='dark:border-2 border-teal-300 rounded-full ml-4' />
                        </div>
                        <ul className='flex items-center'>
                            <li><img onClick={() => setdarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="logo" width={50} height={50} /></li>
                            <li><Link to="/login" className='bg-gray-600 text-slate-400 px-8 py-3 rounded-full ml-8 hover:bg-gray-900 hover:text-white' href="#">Login</Link></li>
                        </ul>
                    </nav>


                    <div className='text-center'>
                        <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>"Veterinary Clinic for Friends of the House"</h2>
                        <div className='text-2xl py-2 md:text-3xl flex justify-center space-x-4'>
                            <img src={logoGato} alt="logo-vet" width={60} height={60} className='dark:border-2 border-teal-300 rounded-full ml-4' />
                            <img src={logoPerro} alt="logo-vet" width={60} height={60} className='dark:border-2 border-teal-300 rounded-full ml-4' />
                            <img src={logoConejo} alt="logo-vet" width={60} height={60} className='dark:border-2 border-teal-300 rounded-full ml-4' />
                            <img src={logoCanario} alt="logo-vet" width={60} height={60} className='dark:border-2 border-teal-300 rounded-full ml-4' />

                        </div>


                        <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>

                            "Welcome to our Friends of Home Veterinary Clinic. At our clinic, we understand that pets are beloved members of your family,
                            and their well-being is our top priority. With a team of dedicated and compassionate professionals, we provide comprehensive veterinary care to ensure the health and happiness of your beloved furry, feathered or scaly companions.
                            Trust us to be your partner in your pets' health care. Your animals are not just our patients; they are our friends too."
                        </p>
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                        <div className='col-span-1 flex items-center'>
                            <p className='text-md py-5 leading-8 md:text-xl max-w-lg mx-auto dark:text-white text-teal-500 font-semibold'>
                                Pet Care Services
                            </p>
                            <ul className='list-disc text-gray-700 text-lg ml-6 dark:text-gray-300'>
                                <li className='mb-2'>
                                Grooming and bathing of animals
                                </li>
                                <li className='mb-2'>
                                Cut and makeover
                                </li>
                                <li className='mb-2'>
                                Deworming
                                </li>
                                <li className='mb-2'>
                                Canine and feline daycare   
                                </li>
                            </ul>

                        </div>
                        <div className='col-span-1 relative mx-auto bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
                            <img src={logoVeterinaria} alt="logo-rocket" />
                        </div>
                        <div className='col-span-1 flex items-center'>
                            <p className='text-md py-5 leading-8  md:text-xl max-w-lg mx-auto  text-black dark:text-teal-500 font-semibold'>
                                Medical Care for Pets
                            </p>
                            <ul className='list-disc text-gray-700 text-lg ml-6 dark:text-gray-300'>
                                <li className='mb-2'>
                                Pet surgeries
                                </li>
                                <li className='mb-2'>
                                Disease preventive services
                                </li>
                                <li className='mb-2'>
                                Supply of medicines and vaccines
                                </li>
                                <li className='mb-2'>
                                Feline medicine
                                </li>
                                <li className='mb-2'>
                                Trichina analysis
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className='text-5xl flex justify-center gap-16 py-3'>
                        <img src={logoFacebook} alt="logo-redes" width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'} />

                        <img src={logoInstagram} alt="logo-redes" width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'} />

                        <img src={logoTiktok} alt="logo-redes" width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'} />

                        <img src={logoTitwer} alt='logo-redes' width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'} />
                    </div>
                </section>
            </main>

        </div>

    )
}