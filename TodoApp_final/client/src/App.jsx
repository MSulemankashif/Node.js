import React from 'react'
import AddTodoPage from './pages/AddTodoPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FetchTodosPage from './pages/FetchTodosPage'
import EditTodoForm from './components/EditTodoForm'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import AuthProvider from './context/AuthContext'
import AuthGuard from './components/AuthGuard'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* AUTH ROUTES */}
            <Route path='/auth/register' element={
              <AuthGuard type='public'>
                <RegisterPage />
              </AuthGuard>
            } />



            <Route path='/auth/login' element={
              <AuthGuard type='public'>
                <LoginPage />
              </AuthGuard>
            } />



            <Route path='/user_profile' element={
                <ProfilePage />
            } />







            {/* TODO ROUTES - PROTECTED */}
            <Route path='/' element={
              <AuthGuard type='protected'>
                <FetchTodosPage />
              </AuthGuard>
            } />



            <Route path='/add_todo' element={
              <AuthGuard type='protected'>
                <AddTodoPage />
              </AuthGuard>
            } />

            
            <Route path='/edit_todo/:id' element={
              <AuthGuard type = "protected">
                <EditTodoForm />
              </AuthGuard>
            } />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App