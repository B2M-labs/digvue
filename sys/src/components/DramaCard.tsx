import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'
import type { Drama } from '../data/dramas'
import { useLang } from '../context/LangContext'

interface Props {
  drama: Drama
  width?: number
  height?: number
}

export default function DramaCard({ drama, width = 130, height = 180 }: Props) {
  const navigate = useNavigate()
  const { lang, t } = useLang()

  return (
    <div
      onClick={() => navigate(`/detalhes/${drama.id}`)}
      style={{ flexShrink: 0, width, cursor: 'pointer' }}
    >
      <div
        style={{
          width,
          height,
          borderRadius: 12,
          marginBottom: 8,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--cinza-escuro)',
          backgroundImage: `url(${drama.thumb})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }} />

        {drama.badge && (
          <span style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '3px 8px',
            background: 'var(--laranja)',
            color: 'var(--branco)',
            fontSize: 10,
            fontWeight: 800,
            borderRadius: 4,
            letterSpacing: 0.5,
            zIndex: 1,
          }}>
            {drama.badge === 'NOVO' ? t('badge_novo') : drama.badge === 'EM ALTA' ? t('badge_trending') : t('badge_vip')}
          </span>
        )}
      </div>

      <div style={{
        fontSize: 13,
        fontWeight: 700,
        marginBottom: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {drama.titulo[lang]}
      </div>
      <div style={{ color: 'var(--cinza-claro)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Star size={11} fill="var(--laranja)" color="var(--laranja)" />
        {drama.rating} • {drama.episodios} eps
      </div>
    </div>
  )
}
