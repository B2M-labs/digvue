import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Play, Star, Plus, Share2, Lock } from 'lucide-react'
import { dramas } from '../data/dramas'
import { getEpisodios } from '../data/episodios'
import { useUser } from '../context/UserContext'
import { useLang } from '../context/LangContext'

export default function Detalhes() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { desbloqueados } = useUser()
  const { lang, t } = useLang()
  const drama = dramas.find((d) => d.id === id)

  if (!drama) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: 'var(--cinza-claro)' }}>
        {t('detalhes_not_found')}
      </div>
    )
  }

  const episodios = getEpisodios(drama.id, drama.episodios)

  const tags: { content: React.ReactNode; orange?: boolean }[] = [
    { content: <><Star size={11} fill="var(--laranja)" color="var(--laranja)" /> {drama.rating}</>, orange: true },
    { content: String(drama.ano) },
    { content: drama.categoria },
    { content: `${drama.episodios} eps` },
  ]

  return (
    <div className="page">
      {/* Banner */}
      <div style={{
        height: 280,
        background: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, var(--preto) 100%), url(${drama.banner}) center/cover no-repeat`,
        position: 'relative',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute', top: 50, left: 16,
            width: 40, height: 40,
            background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%',
            color: 'var(--branco)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} />
        </button>

        <button
          onClick={() => navigate(`/player/${drama.id}/1`)}
          style={{
            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            width: 56, height: 56,
            background: 'rgba(255,107,26,0.92)', border: 'none', borderRadius: '50%',
            color: 'var(--branco)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(255,107,26,0.5)',
          }}
        >
          <Play size={22} fill="currentColor" />
        </button>
      </div>

      <div style={{ padding: '16px var(--page-padding) 0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>{drama.titulo[lang]}</h1>

        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          {tags.map(({ content, orange }, i) => (
            <span key={i} style={{
              padding: '3px 10px', background: 'var(--cinza-escuro)', borderRadius: 6,
              fontSize: 12, color: orange ? 'var(--laranja)' : 'var(--cinza-claro)',
              fontWeight: orange ? 700 : 500,
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>{content}</span>
          ))}
        </div>

        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65, marginBottom: 20 }}>
          {drama.descricao[lang]}
        </p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          <button
            onClick={() => navigate(`/player/${drama.id}/1`)}
            style={{
              flex: 1, padding: '12px 0',
              background: 'var(--branco)', color: 'var(--preto)',
              border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              cursor: 'pointer',
            }}
          >
            <Play size={14} fill="currentColor" /> {t('detalhes_ep1_btn')}
          </button>
          <button style={{
            padding: '12px 14px', background: 'var(--cinza-escuro)',
            border: '1px solid var(--cinza-medio)', borderRadius: 10,
            color: 'var(--branco)', fontWeight: 700, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
          }}>
            <Plus size={16} /> {t('detalhes_watchlist')}
          </button>
          <button style={{
            padding: '12px 14px', background: 'var(--cinza-escuro)',
            border: '1px solid var(--cinza-medio)', borderRadius: 10,
            color: 'var(--branco)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Share2 size={18} />
          </button>
        </div>

        {/* Lista de episódios */}
        <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{t('detalhes_episodes')}</h3>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {episodios.map(({ num, titulo: tituloEp, duracao, thumb, bloqueado: bloqueadoOriginal }) => {
            const liberado = !bloqueadoOriginal || desbloqueados.has(`${drama.id}-${num}`)
            return (
              <div
                key={num}
                onClick={() => navigate(`/player/${drama.id}/${num}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--cinza-escuro)',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 110, height: 66, borderRadius: 8, flexShrink: 0,
                  position: 'relative', overflow: 'hidden',
                  backgroundColor: 'var(--cinza-escuro)',
                  backgroundImage: `url(${thumb})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: liberado ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: liberado ? 'rgba(255,255,255,0.9)' : 'var(--laranja)',
                  }}>
                    {liberado ? <Play size={18} fill="currentColor" /> : <Lock size={20} />}
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 700, marginBottom: 3,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    Ep {num}: {tituloEp[lang]}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: liberado ? 'var(--cinza-claro)' : 'var(--laranja)',
                  }}>
                    {duracao} • {liberado ? t('detalhes_free') : t('detalhes_locked_price')}
                  </div>
                </div>

                {!liberado && (
                  <Lock size={16} color="var(--laranja)" style={{ flexShrink: 0 }} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
