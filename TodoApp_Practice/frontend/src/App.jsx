import React from 'react'
import AddTodoPage from '../pages/AddTodoPage'
import { BrowserRouter } from 'react-router-dom'
import FetchTodosPage from '../pages/FetchTodosPage'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<FetchTodosPage/>}/>
              <Route path='/add_todo' element={<AddTodoPage/>} />
          </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App
