import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { LandinPage } from './paginas/LandinPage'
import { Register } from './paginas/Register'
import { Forgot } from './paginas/usuario/Forgot'
import { NotFound } from './paginas/NotFound'
import Dashboard from './layout/Dashboard'
import Listar from './paginas/cliente/Listar'
import Visualizar from './paginas/usuario/Visualizar'
import Crear from './paginas/cliente/Crear'
import Actualizar from './paginas/cliente/Actualizar'
import Cliente from './paginas/cliente/Cliente'
import { Confirmar } from './paginas/usuario/Confirmar'
import Restablecer from './paginas/usuario/Restablecer'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoute'
import { FormularioCliente } from './componets/FormularioCliente'
import { useState } from 'react'
import TablaClientes from './componets/TablaClientes'



function App() {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route index element={<LandinPage />} />

            <Route path='/' element={<Auth />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgot/:id' element={<Forgot />} />
              <Route path='confirmar/:token' element={<Confirmar />} />
              <Route path='recuperar-password/:token' element={<Restablecer />} />
              <Route path='*' element={<NotFound />} />
            </Route>

            <Route path='dashboard/*' element={
              <PrivateRoute>
                <Routes>
                  <Route element={<Dashboard />}>
                    <Route index element={<Cliente />} />
                    <Route path='listar' element={<Listar />} />
                    <Route path='listarClientes' element={<TablaClientes />} />
                    <Route path='visualizar/:id' element={<Visualizar />} />
                    <Route path="formulario" element={<FormularioCliente isEditMode={isEditMode} />} />
                    <Route path='crear' element={<Crear />} />
                    <Route path='actualizar/:id' element={<Actualizar />} />
                  </Route>
                </Routes>
              </PrivateRoute>
            } />




          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
