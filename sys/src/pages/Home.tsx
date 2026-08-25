import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Search, Star, Play, Plus, Flame, Heart, Gem } from 'lucide-react'
import DramaCard from '../components/DramaCard'
import Section from '../components/Section'
import { dramas, categorias } from '../data/dramas'
import { useLang } from '../context/LangContext'
import { DigVueLogo } from '../components/Logo'

const destaque = dramas[7]

export default function Home() {
  const [catAtiva, setCatAtiva] = useState('Tudo')
  const navigate = useNavigate()
  const { lang, t } = useLang()

  const catDisplay: Record<string, string> = {
    'Tudo':     t('cat_all'),
    'Romance':  t('cat_romance'),
    'Drama':    t('cat_drama'),
    'Comédia':  t('cat_comedy'),
    'Suspense': t('cat_suspense'),
    'Família':  t('cat_family'),
  }

  const emAlta = dramas.filter((d) => d.badge === 'EM ALTA' || d.rating >= 4.8).slice(0, 6)
  const romances = dramas.filter((d) => d.categoria === 'Romance')
  const filtrados = catAtiva === 'Tudo'
    ? dramas
    : dramas.filter((d) => d.categoria === catAtiva)

  return (
    <div className="page">
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--cinza-escuro)',
        padding: '0 var(--page-padding)',
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <DigVueLogo height={26} tone="dark" />
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            style={{ width: 38, height: 38, background: 'var(--cinza-escuro)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--branco)', cursor: 'pointer' }}
          >
            <Bell size={18} />
          </button>
          <button
            onClick={() => navigate('/busca')}
            style={{ width: 38, height: 38, background: 'var(--cinza-escuro)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--branco)', cursor: 'pointer' }}
          >
            <Search size={18} />
          </button>
        </div>
      </header>

      {/* Categorias */}
      <div style={{
        display: 'flex',
        gap: 8,
        padding: '14px var(--page-padding) 8px',
        overflowX: 'auto',
      }}>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCatAtiva(cat)}
            style={{
              flexShrink: 0,
              padding: '8px 16px',
              background: catAtiva === cat ? 'var(--laranja)' : 'var(--cinza-escuro)',
              color: 'var(--branco)',
              border: 'none',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              transition: 'background 0.2s',
              cursor: 'pointer',
            }}
          >
            {catDisplay[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* Banner destaque */}
      {catAtiva === 'Tudo' && (
        <div
          onClick={() => navigate(`/detalhes/${destaque.id}`)}
          style={{
            margin: '8px var(--page-padding) 24px',
            height: 220,
            borderRadius: 20,
            background: `
              linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.92) 100%),
              url(${destaque.banner}) center/cover no-repeat
            `,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          <span style={{
            alignSelf: 'flex-start',
            padding: '3px 10px',
            background: 'var(--laranja)',
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 1,
            borderRadius: 4,
            textTransform: 'uppercase',
            marginBottom: 8,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <Star size={10} fill="currentColor" /> {t('home_trending_badge')}
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.15, marginBottom: 4 }}>
            {destaque.titulo[lang]}
          </h2>
          <p style={{ color: 'var(--cinza-claro)', fontSize: 12, marginBottom: 12 }}>
            {destaque.episodios} {t('home_episodes')} • {catDisplay[destaque.categoria] ?? destaque.categoria}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/player/${destaque.id}/1`) }}
              style={{
                flex: 1, padding: '10px',
                background: 'var(--branco)', color: 'var(--preto)',
                border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                cursor: 'pointer',
              }}
            >
              <Play size={14} fill="currentColor" /> {t('home_watch')}
            </button>
            <button style={{
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.15)', color: 'var(--branco)',
              border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8,
              fontWeight: 700, fontSize: 13,
              display: 'flex', alignItems: 'center', gap: 5,
              cursor: 'pointer',
            }}>
              <Plus size={14} /> {t('home_watchlist')}
            </button>
          </div>
        </div>
      )}

      {/* Seções filtradas */}
      {catAtiva === 'Tudo' ? (
        <>
          <Section title={<><Flame size={17} /> {t('home_section_trending')}</>} onVerTudo={() => setCatAtiva('Drama')}>
            {emAlta.map((d) => <DramaCard key={d.id} drama={d} />)}
          </Section>
          <Section title={<><Heart size={17} /> {t('home_section_romance')}</>} onVerTudo={() => setCatAtiva('Romance')}>
            {romances.map((d) => <DramaCard key={d.id} drama={d} />)}
          </Section>
          <Section title={<><Gem size={17} /> {t('home_section_vip')}</>}>
            {dramas.filter((d) => d.badge === 'VIP').map((d) => <DramaCard key={d.id} drama={d} />)}
          </Section>
        </>
      ) : (
        <Section title={`${t('home_results_label')}: ${catDisplay[catAtiva] ?? catAtiva}`}>
          {filtrados.length > 0
            ? filtrados.map((d) => <DramaCard key={d.id} drama={d} />)
            : <p style={{ color: 'var(--cinza-claro)', fontSize: 14, padding: '8px 0' }}>{t('home_no_dramas')}</p>
          }
        </Section>
      )}
    </div>
  )
}
