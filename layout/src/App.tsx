import { useState, type ReactElement } from 'react'
import Sidebar from './components/Sidebar'
import SplashScreen   from './screens/SplashScreen'
import LoginScreen    from './screens/LoginScreen'
import HomeScreen     from './screens/HomeScreen'
import PlayerScreen   from './screens/PlayerScreen'
import DetalhesScreen from './screens/DetalhesScreen'
import BuscaScreen    from './screens/BuscaScreen'
import CarteiraScreen from './screens/CarteiraScreen'
import VipScreen      from './screens/VipScreen'
import PerfilScreen   from './screens/PerfilScreen'

type Screen =
  | 'splash' | 'login' | 'home' | 'player'
  | 'detalhes' | 'busca' | 'carteira' | 'vip' | 'perfil'

const screenMeta: Record<Screen, { title: string; desc: string }> = {
  splash:   { title: '🚪 Tela de Splash',            desc: 'A "porta de entrada" do app — primeira coisa que aparece quando o usuário abre o DigVue.' },
  login:    { title: '🔐 Tela de Login / Cadastro',   desc: 'Onde o usuário entra com email e senha, ou cria uma conta nova.' },
  home:     { title: '🏠 Tela Home',                  desc: 'Tela principal com banner, categorias e listas de dramas para o usuário escolher.' },
  player:   { title: '🎬 Tela do Player',             desc: 'Onde o usuário assiste o episódio (formato vertical estilo TikTok no celular).' },
  detalhes: { title: '📺 Tela de Detalhes da Série',  desc: 'Mostra todas as informações da série e a lista de episódios disponíveis.' },
  busca:    { title: '🔍 Tela de Busca',              desc: 'Onde o usuário procura dramas por nome, gênero ou tendência.' },
  carteira: { title: '🪙 Tela da Carteira',           desc: 'Mostra o saldo de moedas, pacotes para comprar e histórico de transações.' },
  vip:      { title: '💎 Tela VIP',                   desc: 'Página de assinatura premium — onde o usuário compra o plano para liberar tudo.' },
  perfil:   { title: '👤 Tela de Perfil',             desc: 'Página do usuário com dados, estatísticas e atalhos para configurações.' },
}

const screens: Record<Screen, ReactElement> = {
  splash:   <SplashScreen />,
  login:    <LoginScreen />,
  home:     <HomeScreen />,
  player:   <PlayerScreen />,
  detalhes: <DetalhesScreen />,
  busca:    <BuscaScreen />,
  carteira: <CarteiraScreen />,
  vip:      <VipScreen />,
  perfil:   <PerfilScreen />,
}

export default function App() {
  const [active, setActive] = useState<Screen>('splash')
  const meta = screenMeta[active]

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active={active} onChange={(s) => setActive(s)} />

      <main style={{
        flex: 1,
        padding: 32,
        overflowY: 'auto',
        background: `
          radial-gradient(circle at 20% 0%, rgba(255, 107, 26, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 100%, rgba(255, 107, 26, 0.05) 0%, transparent 50%),
          var(--preto)
        `,
      }}>
        <div style={{
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: '1px solid var(--cinza-escuro)',
          width: '100%',
        }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--branco)', marginBottom: 4 }}>{meta.title}</h1>
          <p style={{ color: 'var(--cinza-claro)', fontSize: 15 }}>{meta.desc}</p>
        </div>

        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
          {screens[active]}
        </div>
      </main>
    </div>
  )
}
