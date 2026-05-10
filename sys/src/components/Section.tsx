import type { ReactNode } from 'react'
import { useLang } from '../context/LangContext'

interface Props {
  title: ReactNode
  onVerTudo?: () => void
  children: ReactNode
}

export default function Section({ title, onVerTudo, children }: Props) {
  const { t } = useLang()

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 var(--page-padding)',
        marginBottom: 12,
      }}>
        <h3 style={{ fontSize: 17, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 7 }}>{title}</h3>
        {onVerTudo && (
          <button
            onClick={onVerTudo}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--laranja)',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t('section_see_all')}
          </button>
        )}
      </div>
      <div style={{
        display: 'flex',
        gap: 12,
        padding: '0 var(--page-padding)',
        overflowX: 'auto',
      }}>
        {children}
      </div>
    </div>
  )
}
