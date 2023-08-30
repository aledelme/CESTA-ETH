import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Productos } from './components/Productos'
import { Cesta } from './components/Cesta'
import { Home } from './components/Home'
import { Producto } from './components/Producto'
import { QueryClient, QueryClientProvider } from 'react-query' 

const queryClient = new QueryClient()
export const Context = createContext(null)
function App(){
  const [cesta, setCesta] = useState([])
  return <Context.Provider value={[cesta, setCesta]}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}>
          <Route index element={<Productos></Productos>}></Route>
          <Route path='*' element={<Productos></Productos>}></Route>
          <Route path='productos' element={<Productos></Productos>}></Route>
          <Route path='productos/:id' element={<Producto></Producto>}></Route>
          <Route path='cesta' element={<Cesta></Cesta>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
</Context.Provider>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
)
