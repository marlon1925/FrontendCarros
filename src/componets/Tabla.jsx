import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import { format, parseISO, isValid, parse } from 'date-fns';
import {
    useTable,
    useFilters,
    useGlobalFilter,
    usePagination,
} from "react-table";
import { FaTrashAlt, FaEdit, FaFolderOpen, FaClock, FaAngleRight, FaAngleDoubleRight, FaAngleLeft, FaAngleDoubleLeft } from "react-icons/fa";


const Tabla = () => {
    const navigate = useNavigate();
    const [pacientes, setPacientes] = useState([]);
    const [noMorePages, setNoMorePages] = useState(false);
    const [filtroTiempo, setFiltroTiempo] = useState("today");
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(""); // Declaración de fechaSeleccionada
    const [resultadosEncontrados, setResultadosEncontrados] = useState(true);


    function convertirFecha(fechaEnFormatoDDMMYYYY) {
        // Parsear la fecha en formato "dd/MM/yyyy" a un objeto Date
        const fechaParseada = parse(fechaEnFormatoDDMMYYYY, 'dd/MM/yyyy', new Date());

        // Formatear la fecha en el formato deseado
        const fechaFormateada = format(fechaParseada, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

        return fechaFormateada;
    }

    const handleFiltroTiempoChange = (nuevoFiltro) => {
        setFiltroTiempo(nuevoFiltro);
        setMenuAbierto(false);

        if (nuevoFiltro === "today") {
            // Obtener la fecha actual
            const fechaActual = new Date();

            // Filtrar los datos para mostrar solo los que tienen la fecha de "Departure" igual a la fecha actual
            const datosFiltrados = pacientes.filter((paciente) => {
                const fechaSalida = new Date(paciente.ingreso); // Asegúrate de que paciente.salida sea un formato de fecha válido

                // Compara la fecha de "Departure" con la fecha actual (ignorando la hora, minutos y segundos)
                return (
                    fechaSalida.getDate() === fechaActual.getDate() &&
                    fechaSalida.getMonth() === fechaActual.getMonth() &&
                    fechaSalida.getFullYear() === fechaActual.getFullYear()
                );
            });

            // Actualiza los datos que se muestran en la tabla con los datos filtrados
            setPacientes(datosFiltrados);

            // Verifica si se encontraron resultados
            setResultadosEncontrados(datosFiltrados.length > 0);
        } else if (nuevoFiltro === "customDate" && fechaSeleccionada) {
            const datosFiltrados = pacientes.filter((paciente) => {
                const newDate = new Date(convertirFecha(fechaSeleccionada));
                const fechaSalida = new Date(paciente.ingreso);

                return (
                    fechaSalida.getDate() === newDate.getDate() &&
                    fechaSalida.getMonth() === newDate.getMonth() &&
                    fechaSalida.getFullYear() === newDate.getFullYear()
                );
            });
            setPacientes(datosFiltrados);

            // Verifica si se encontraron resultados
            setResultadosEncontrados(datosFiltrados.length > 0);
        } else {
            // Si no se seleccionó "Today", muestra todos los pacientes sin filtrar
            listarPacientes();

            // Aquí puedes restablecer el estado de resultadosEncontrados
            setResultadosEncontrados(pacientes.length > 0);
        }
    };


    const listarPacientes = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            const data = respuesta.data;

            if (data.length === 0) {
                setNoMorePages(true);
            } else {
                setNoMorePages(false);
            }

            // Ordena los pacientes por la fecha de salida de forma descendente
            data.sort((a, b) => new Date(b.salida) - new Date(a.salida));

            setPacientes(data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        listarPacientes();
    }, [resultadosEncontrados, setResultadosEncontrados]);

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm(
                "You are going to check out a patient, are you sure to perform this action?"
            );
            if (confirmar) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL
                    }/paciente/eliminar/${id}`;
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };
                const data = {
                    salida: new Date().toString(),
                };
                await axios.delete(url, { headers, data });
                listarPacientes();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const data = React.useMemo(() => pacientes, [pacientes]);
    const columns = React.useMemo(
        () => [
            {
                Header: "N°",
                accessor: (row, index) => index + 1,
                // Puedes utilizar un accessor personalizado para la numeración
            },
            {
                Header: "Pet",
                accessor: "nombre",
            },
            {
                Header: "Owner",
                accessor: "propietario",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Cell phone",
                accessor: "celular",
            },
            {
                Header: "Attention",
                accessor: "ingreso",
                Cell: ({ value }) => {
                    console.log(value)
                    const fechaSalida = parseISO(value);
                    if (isValid(fechaSalida)) {
                        return <span>{format(fechaSalida, "dd/MM/yyyy")}</span>;
                    } else {
                        return <span>Fecha no válida</span>;
                    }
                },
            },
            {
                Header: "Actions",
                accessor: "acciones",
                Cell: ({ row }) => (
                    <div className="py-2 text-center">
                        {/* Reemplaza MdDeleteForever con FaTrashAlt */}
                        <FaFolderOpen
                            className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                            onClick={() =>
                                navigate(`/dashboard/visualizar/${row.original._id}`)
                            }
                        />
                        <FaEdit
                            className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                            onClick={() =>
                                navigate(`/dashboard/actualizar/${row.original._id}`)
                            }
                        />
                        <FaTrashAlt
                            className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                            onClick={() => {
                                handleDelete(row.original._id);
                            }}
                        />
                    </div>
                ),
            },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        setGlobalFilter,
        state: { globalFilter, pageIndex, pageSize },
        page,
        gotoPage,
        setPageSize,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageCount,
        nextPage
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 5, defaultCanSort: true }, // Agrega defaultCanSort
        },
        useFilters,
        useGlobalFilter,
        usePagination
    );


    return (
        <div className="mt-4">

            {pacientes.length === 0 ? (
                <Mensaje tipo={"active"}>{"No records"}</Mensaje>
                
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={globalFilter || ""}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Search by owner's name..."
                                className="w-full px-4 py-2 border rounded-md pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-5.2-5.2"
                                    />
                                    <circle cx="10" cy="10" r="7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                onClick={() => setMenuAbierto(!menuAbierto)}
                                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                <FaClock className="mr-1" />
                                Intervalo de tiempo
                                <FaAngleRight className={`ml-1 ${menuAbierto ? "transform rotate-180" : ""}`} />
                            </button>

                        </div>
                        {menuAbierto && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <button
                                        onClick={() => handleFiltroTiempoChange("today")}
                                        className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${filtroTiempo === "today" ? "bg-gray-100 text-gray-900" : ""
                                            }`}
                                        role="menuitem"
                                    >
                                        Today
                                    </button>
                                    <button
                                        onClick={() => handleFiltroTiempoChange("all")}
                                        className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${filtroTiempo === "all" ? "bg-gray-100 text-gray-900" : ""
                                            }`}
                                        role="menuitem"
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => handleFiltroTiempoChange("otherDate")}
                                        className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${filtroTiempo === "otherDate" ? "bg-gray-100 text-gray-900" : ""
                                            }`}
                                        role="menuitem"
                                    >
                                        Other Date
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {filtroTiempo === "otherDate" && (
                        <div className="absolute mt-2 right-0 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <label htmlFor="fechaInput" className="block text-sm font-medium text-gray-700">
                                    Select a Date:
                                </label>
                                <input
                                    id="fechaInput"
                                    type="text"
                                    placeholder="dd/mm/yyyy"
                                    className="w-full mt-2 px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                                    value={fechaSeleccionada}
                                    onChange={(e) => setFechaSeleccionada(e.target.value)}
                                />
                                <button
                                    onClick={() => handleFiltroTiempoChange("customDate")}
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}
                    {/* 
                    <table {...getTableProps()} className="w-full mt-5 table-auto shadow-lg bg-white">
                        <thead className="bg-gray-800 text-slate-400">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()} className="p-2">
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                const { original } = row;
                                return (
                                    <tr {...row.getRowProps()} className="border-b hover:bg-gray-300 text-center" key={original._id}>
                                        {row.cells.map((cell) => {
                                            const { render, getCellProps } = cell;
                                            return <td {...getCellProps()}>{render("Cell")}</td>;
                                        })}
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table> */}
                    {resultadosEncontrados ? (

                        <table {...getTableProps()} className="w-full mt-5 table-auto shadow-lg bg-white">
                            <thead className="bg-gray-800 text-slate-400">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()} className="p-2">
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row) => {
                                    prepareRow(row);
                                    const { original } = row;
                                    return (
                                        <tr {...row.getRowProps()} className="border-b hover:bg-gray-300 text-center" key={original._id}>
                                            {row.cells.map((cell) => {
                                                const { render, getCellProps } = cell;
                                                return <td {...getCellProps()}>{render("Cell")}</td>;
                                            })}
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                    ) : (
                        <Mensaje tipo={"activ"}>{"No records"}</Mensaje>
                    )}
                    <div className="pagination flex items-center justify-center mt-4">
                        <button
                            className="px-3 py-1 border rounded-md mr-2 hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            {<FaAngleDoubleLeft />}
                        </button>{" "}
                        <button
                            className="px-3 py-1 border rounded-md hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            {<FaAngleLeft />}
                        </button>{" "}


                        <span className="mr-2">
                            {" | "}
                            {Array.from({ length: pageCount }).map((_, page) => (
                                <button
                                    key={page}
                                    onClick={() => gotoPage(page)}
                                    className={`px-3 py-1 border rounded-md mr-2 hover:bg-gray-400 hover:text-white ${pageIndex === page ? "bg-gray-800 text-slate-400" : ""
                                        }`}
                                >
                                    {page + 1}
                                </button>
                            ))}
                        </span>


                        <select
                            className="px-2 py-1 border rounded-md mr-2"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[1, 5, 10, 15, 20].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        <button
                            className="px-3 py-1 border rounded-md hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            {<FaAngleRight />}
                        </button>{" "}
                        <button
                            className="px-3 py-1 border rounded-md hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            {<FaAngleDoubleRight />}
                        </button>{" "}
                    </div>
                    <span className="mr-2">
                        <strong>Page</strong>{" "}
                        <strong>
                            {pageIndex + 1} de {pageCount}
                        </strong>
                    </span>

                </>
            )}
        </div>
    );
};

export default Tabla;
