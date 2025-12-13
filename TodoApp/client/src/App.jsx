import React from 'react'
import AddTodoPage from './pages/AddTodoPage'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import FetchTodosPage from './pages/FetchTodosPage'

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
       <Route path='/'  element={<FetchTodosPage/>}  />
       <Route path='/add_todo'  element={<AddTodoPage/>}  />

     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App