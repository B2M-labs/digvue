import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Tag, TrendingUp } from 'lucide-react'
import DramaCard from '../components/DramaCard'
import { dramas } from '../data/dramas'

const tags = [
  { label: 'Romance CEO', popular: true },
  { label: 'Casamento',   popular: false },
  { label: 'Vingança',    popular: false },
  { label: 'Lobo Alfa',   popular: true },
  { label: 'Família Rica', popular: false },
  { label: 'Princesa',    popular: false },
  { label: 'Mafia',       popular: false },
]

export default function Busca() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const resultados = query.length >= 2
    ? dramas.filter((d) =>
        d.titulo.toLowerCase().includes(query.toLowerCase()) ||
        d.categoria.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className="page">
      <div style={{
        position: 'sticky', top: 0,
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(12px)',
        padding: '16px var(--page-padding)',
        zIndex: 50,
        borderBottom: '1px solid var(--cinza-escuro)',
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Search size={20} /> Buscar
        </h2>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--cinza-claro)', pointerEvents: 'none',
            display: 'flex', alignItems: 'center',
          }}>
            <Search size={17} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar drama, série, gênero..."
            style={{
              width: '100%',
              padding: '13px 16px 13px 44px',
              background: 'var(--cinza-escuro)',
              border: '2px solid transparent',
              borderRadius: 12,
              color: 'var(--branco)',
              fontSize: 15,
            }}
          />
        </div>
      </div>

      <div style={{ padding: '0 var(--page-padding)' }}>
        {query.length >= 2 ? (
          <>
            <h3 style={{ padding: '20px 0 12px', fontSize: 15, fontWeight: 700 }}>
              {resultados.length} resultado{resultados.length !== 1 ? 's' : ''} para "{query}"
            </h3>
            {resultados.length > 0 ? (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {resultados.map((d) => <DramaCard key={d.id} drama={d} />)}
              </div>
            ) : (
              <p style={{ color: 'var(--cinza-claro)', fontSize: 14, marginTop: 8 }}>
                Nenhum drama encontrado.
              </p>
            )}
          </>
        ) : (
          <>
            <h3 style={{ padding: '20px 0 12px', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7 }}>
              <Tag size={15} /> Buscas Populares
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tags.map(({ label, popular }) => (
                <button
                  key={label}
                  onClick={() => setQuery(label)}
                  style={{
                    padding: '8px 14px',
                    background: popular
                      ? 'linear-gradient(90deg, var(--laranja-escuro), var(--laranja))'
                      : 'var(--cinza-escuro)',
                    border: 'none', borderRadius: 20,
                    color: 'var(--branco)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <h3 style={{ padding: '24px 0 12px', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7 }}>
              <TrendingUp size={15} /> Tendências
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {dramas.slice(0, 6).map((d, i) => (
                <div
                  key={d.id}
                  onClick={() => navigate(`/detalhes/${d.id}`)}
                  style={{
                    display: 'flex', gap: 10, padding: 10,
                    background: 'var(--cinza-escuro)', borderRadius: 12, cursor: 'pointer',
                  }}
                >
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 30, color: 'var(--laranja)', lineHeight: 1, width: 28,
                  }}>{i + 1}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{d.titulo}</div>
                    <div style={{ fontSize: 11, color: 'var(--cinza-claro)' }}>{d.categoria}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
