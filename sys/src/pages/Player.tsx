import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Play, Pause, ShoppingCart, Heart,
  MessageCircle, Share2, Lock, Coins, Tv, Gem,
  ChevronLeft, ChevronRight, X, ExternalLink,
} from 'lucide-react'
import { dramas } from '../data/dramas'
import { getEpisodios } from '../data/episodios'
import { produtosPorEpisodio } from '../data/produtos'
import { useUser } from '../context/UserContext'

export default function Player() {
  const { id, ep } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const { saldo, desbloqueados, gastar, desbloquear } = useUser()

  const drama = dramas.find((d) => d.id === id)
  const epNum = Number(ep ?? 1)
  const episodios = drama ? getEpisodios(drama.id, drama.episodios) : []
  const episodio = episodios[epNum - 1]
  const chaveEp = `${id}-${epNum}`
  const bloqueadoOriginal = episodio?.bloqueado ?? false
  const desbloqueado = desbloqueados.has(chaveEp)
  const bloqueado = bloqueadoOriginal && !desbloqueado

  const [playing, setPlaying] = useState(false)
  const [progresso, setProgresso] = useState(0)
  const [curtido, setCurtido] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [dragging, setDragging] = useState(false)
  const [showLoja, setShowLoja] = useState(false)
  const [erroMoedas, setErroMoedas] = useState(false)

  const produtosEp = drama ? (produtosPorEpisodio[`${drama.id}-${epNum}`] ?? []) : []

  // esconde controles após 3s de play (suspende durante drag)
  useEffect(() => {
    if (!playing || dragging) { setShowControls(true); return }
    const t = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(t)
  }, [playing, dragging])

  // listeners globais de drag na progress bar
  useEffect(() => {
    if (!dragging) return

    function onMove(clientX: number) {
      const el = progressRef.current
      const v = videoRef.current
      if (!el || !v || !v.duration) return
      const rect = el.getBoundingClientRect()
      const frac = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      v.currentTime = frac * v.duration
      setProgresso(frac)
    }

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX)
    const onTouchMove = (e: TouchEvent) => { if (e.touches[0]) onMove(e.touches[0].clientX) }
    const onUp = () => setDragging(false)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }

  function onTimeUpdate() {
    const v = videoRef.current
    if (!v || !v.duration || dragging) return
    setProgresso(v.currentTime / v.duration)
  }

  function startSeek(clientX: number) {
    const el = progressRef.current
    const v = videoRef.current
    if (!el || !v || !v.duration) return
    const rect = el.getBoundingClientRect()
    const frac = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    v.currentTime = frac * v.duration
    setProgresso(frac)
    setDragging(true)
  }

  const proximoEp = episodios[epNum]
  const anteriorEp = episodios[epNum - 2]

  if (!drama || !episodio) {
    return <div style={{ color: 'var(--cinza-claro)', padding: 24 }}>Episódio não encontrado.</div>
  }

  const sideActions = [
    { Icon: ShoppingCart, label: 'Loja',   fill: false, action: () => setShowLoja(true) },
    { Icon: Heart,        label: '12.5K',  fill: curtido, action: () => setCurtido((v) => !v) },
    { Icon: MessageCircle,label: '348',    fill: false, action: () => {} },
    { Icon: Share2,       label: 'Enviar', fill: false, action: () => {} },
  ]

  function usarMoedas() {
    const ok = gastar(50, `Ep ${epNum} desbloqueado — ${drama?.titulo ?? ''}`)
    if (ok) {
      desbloquear(chaveEp)
      setErroMoedas(false)
    } else {
      setErroMoedas(true)
    }
  }

  const unlockOptions = [
    { Icon: Coins, label: 'Usar 50 moedas',  right: saldo >= 50 ? `${saldo} 🪙` : 'Saldo insuficiente', primary: true,  action: usarMoedas },
    { Icon: Tv,    label: 'Assistir anúncio',right: 'Grátis',   primary: false, action: () => {} },
    { Icon: Gem,   label: 'Assinar VIP',     right: 'R$ 19,90', primary: false, action: () => navigate('/vip') },
  ]

  return (
    <div
      style={{ height: '100dvh', background: '#000', position: 'relative', overflow: 'hidden' }}
      onClick={() => setShowControls((s) => !s)}
    >
      {/* ── VÍDEO ─────────────────────────────────────────────────── */}
      {!bloqueado && (
        <video
          ref={videoRef}
          src={episodio.videoUrl}
          poster={episodio.thumb}
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setPlaying(false)}
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      {/* fundo quando bloqueado */}
      {bloqueado && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${episodio.thumb})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'blur(4px) brightness(0.4)',
        }} />
      )}

      {/* ── GRADIENTE UI ──────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 25%, transparent 55%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* ── TOP BAR ───────────────────────────────────────────────── */}
      {(showControls || !playing) && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          padding: '48px 20px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20,
        }} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(-1)}
            style={{ width: 40, height: 40, background: 'rgba(0,0,0,0.45)', border: 'none', borderRadius: '50%', color: 'var(--branco)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ArrowLeft size={18} />
          </button>

          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{drama.titulo}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>
              Ep {epNum}: {episodio.titulo}
            </div>
          </div>

          <div style={{ width: 40 }} />
        </div>
      )}

      {/* ── BOTÃO PLAY CENTRAL ────────────────────────────────────── */}
      {!bloqueado && (showControls || !playing) && (
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay() }}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 72, height: 72,
            background: 'rgba(255,107,26,0.88)', border: 'none', borderRadius: '50%',
            color: 'var(--branco)', cursor: 'pointer', zIndex: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(255,107,26,0.5)',
          }}
        >
          {playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
        </button>
      )}

      {/* ── AÇÕES LATERAIS ────────────────────────────────────────── */}
      {!bloqueado && (showControls || !playing) && (
        <div style={{
          position: 'absolute', right: 14, bottom: 120,
          display: 'flex', flexDirection: 'column', gap: 20, zIndex: 20,
        }} onClick={(e) => e.stopPropagation()}>
          {sideActions.map(({ Icon, label, fill, action }) => (
            <div
              key={label}
              onClick={action}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
            >
              <div style={{ width: 44, height: 44, background: 'rgba(0,0,0,0.45)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--branco)' }}>
                <Icon size={22} fill={fill ? 'currentColor' : 'none'} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700 }}>{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── INFO + NAVEGAÇÃO ENTRE EPISÓDIOS ──────────────────────── */}
      {!bloqueado && (showControls || !playing) && (
        <div style={{
          position: 'absolute', bottom: 32, left: 20, right: 72, zIndex: 20,
        }} onClick={(e) => e.stopPropagation()}>
          <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>
            Ep {epNum}: {episodio.titulo}
          </h3>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 14, lineHeight: 1.4 }}>
            {drama.descricao}
          </p>

          <div style={{ display: 'flex', gap: 8 }}>
            {anteriorEp && (
              <button
                onClick={() => navigate(`/player/${drama.id}/${epNum - 1}`)}
                style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 8, color: 'var(--branco)', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <ChevronLeft size={14} /> Ep {epNum - 1}
              </button>
            )}
            {proximoEp && (
              <button
                onClick={() => navigate(`/player/${drama.id}/${epNum + 1}`)}
                style={{
                  padding: '8px 14px',
                  background: proximoEp.bloqueado ? 'var(--cinza-escuro)' : 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)', borderRadius: 8,
                  color: proximoEp.bloqueado ? 'var(--laranja)' : 'var(--branco)',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}
              >
                {proximoEp.bloqueado
                  ? <><Lock size={12} /> Ep {epNum + 1}</>
                  : <>Ep {epNum + 1} <ChevronRight size={14} /></>
                }
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── BARRA DE PROGRESSO ────────────────────────────────────── */}
      {!bloqueado && (
        <div
          ref={progressRef}
          onMouseDown={(e) => { e.stopPropagation(); startSeek(e.clientX) }}
          onTouchStart={(e) => { e.stopPropagation(); if (e.touches[0]) startSeek(e.touches[0].clientX) }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 20, display: 'flex', alignItems: 'flex-end',
            zIndex: 21, cursor: 'pointer',
          }}
        >
          <div style={{ width: '100%', height: 3, background: 'rgba(255,255,255,0.2)', position: 'relative' }}>
            <div style={{
              height: '100%', width: `${progresso * 100}%`,
              background: 'var(--laranja)',
              transition: dragging ? 'none' : 'width 0.5s linear',
            }} />
            <div style={{
              position: 'absolute', top: '50%', left: `${progresso * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: dragging ? 14 : 10, height: dragging ? 14 : 10,
              borderRadius: '50%', background: 'var(--laranja)',
              transition: dragging ? 'none' : 'left 0.5s linear, width 0.1s, height 0.1s',
              boxShadow: dragging ? '0 0 0 3px rgba(255,107,26,0.3)' : 'none',
            }} />
          </div>
        </div>
      )}

      {/* ── LOJA DO EPISÓDIO ──────────────────────────────────────── */}
      {showLoja && produtosEp.length > 0 && (
        <div
          style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowLoja(false)}
        >
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: '#141414',
              borderRadius: '20px 20px 0 0',
              paddingBottom: 32,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '18px 20px 14px',
              borderBottom: '1px solid var(--cinza-escuro)',
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>Itens do Episódio</div>
                <div style={{ fontSize: 12, color: 'var(--cinza-claro)', marginTop: 2 }}>
                  Itens vistos nessa cena
                </div>
              </div>
              <button
                onClick={() => setShowLoja(false)}
                style={{ background: 'var(--cinza-escuro)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--branco)', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Produtos */}
            <div style={{ display: 'flex', gap: 12, padding: '16px 20px 0', overflowX: 'auto' }}>
              {produtosEp.map((p) => (
                <div key={p.url} style={{ flexShrink: 0, width: 140 }}>
                  <img
                    src={p.img}
                    alt={p.titulo}
                    style={{ width: 140, height: 140, borderRadius: 12, objectFit: 'cover', display: 'block', background: 'var(--cinza-escuro)' }}
                  />
                  <p style={{
                    fontSize: 12, fontWeight: 600, margin: '8px 0 10px',
                    lineHeight: 1.4,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {p.titulo}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      padding: '9px 0',
                      background: 'var(--laranja)', borderRadius: 8,
                      fontSize: 12, fontWeight: 700, color: 'var(--branco)', textDecoration: 'none',
                    }}
                  >
                    Comprar <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── OVERLAY BLOQUEADO ─────────────────────────────────────── */}
      {bloqueado && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 30, padding: '0 32px', textAlign: 'center',
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '48px 20px 16px', display: 'flex' }}>
            <button
              onClick={() => navigate(-1)}
              style={{ width: 40, height: 40, background: 'rgba(0,0,0,0.45)', border: 'none', borderRadius: '50%', color: 'var(--branco)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ArrowLeft size={18} />
            </button>
          </div>

          <div style={{ color: 'var(--branco)', marginBottom: 16 }}><Lock size={52} /></div>
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Episódio Bloqueado</h3>
          <p style={{ color: 'var(--cinza-claro)', fontSize: 14, marginBottom: erroMoedas ? 8 : 24 }}>
            Desbloqueie para continuar assistindo
          </p>
          {erroMoedas && (
            <p style={{ color: '#f87171', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
              Saldo insuficiente. Compre mais moedas ou assista um anúncio.
            </p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            {unlockOptions.map(({ Icon, label, right, primary, action }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  padding: 14,
                  background: primary ? 'var(--laranja)' : 'rgba(30,30,30,0.9)',
                  border: `1px solid ${primary ? 'var(--laranja)' : 'rgba(255,255,255,0.15)'}`,
                  borderRadius: 12, cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontSize: 14, fontWeight: 600, color: 'var(--branco)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon size={16} /> {label}
                </span>
                <span>{right}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
