import type { ReactNode } from 'react'

interface Props {
  label?: string
  children: ReactNode
}

export default function DesktopMockup({ label, children }: Props) {
  return (
    <div className="desktop-wrapper">
      {label && <div className="desktop-label">{label}</div>}
      <div className="desktop">
        <div className="desktop-barra">
          <div className="ponto vermelho" />
          <div className="ponto amarelo" />
          <div className="ponto verde" />
        </div>
        {children}
      </div>
    </div>
  )
}
