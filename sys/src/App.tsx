import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { LangProvider } from './context/LangContext'
import { CartProvider } from './context/CartContext'
import BottomNav from './components/BottomNav'
import Home      from './pages/Home'
import Busca     from './pages/Busca'
import Carteira  from './pages/Carteira'
import Perfil    from './pages/Perfil'
import Vip       from './pages/Vip'
import Detalhes  from './pages/Detalhes'
import Player    from './pages/Player'

export default function App() {
  return (
    <LangProvider>
    <UserProvider>
    <CartProvider>
    <BrowserRouter>
      <Routes>
        {/* Player ocupa tela cheia sem BottomNav */}
        <Route path="/player/:id/:ep" element={<Player />} />

        {/* Layout padrão com BottomNav */}
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
    </UserProvider>
    </LangProvider>
  )
}

function MainLayout() {
  return (
    <>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/busca"     element={<Busca />} />
        <Route path="/carteira"  element={<Carteira />} />
        <Route path="/perfil"    element={<Perfil />} />
        <Route path="/vip"       element={<Vip />} />
        <Route path="/detalhes/:id" element={<Detalhes />} />
      </Routes>
      <BottomNav />
    </>
  )
}
