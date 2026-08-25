import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Play, Pause, ShoppingBag, Heart,
  MessageCircle, Share2, Lock, Coins, Tv, Gem,
  ChevronLeft, ChevronRight, X,
} from 'lucide-react'
import { dramas } from '../data/dramas'
import { getEpisodios } from '../data/episodios'
import { getProdutos } from '../data/produtos'
import { useUser } from '../context/UserContext'
import { useLang } from '../context/LangContext'
import { useCart } from '../context/CartContext'
import SceneHotspots from '../components/SceneHotspots'
import CartSheet from '../components/CartSheet'
import { VMark } from '../components/Logo'

export default function Player() {
  const { id, ep } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const { saldo, desbloqueados, gastar, desbloquear } = useUser()
  const { lang, t } = useLang()
  const { quantidade } = useCart()

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
  const [showCarrinho, setShowCarrinho] = useState(false)
  const [erroMoedas, setErroMoedas] = useState(false)
  const [dicaVista, setDicaVista] = useState(
    () => localStorage.getItem('dv_dica_v') === '1'
  )

  const produtosEp = drama ? getProdutos(drama.id, epNum) : []

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
    return <div style={{ color: 'var(--cinza-claro)', padding: 24 }}>{t('player_not_found')}</div>
  }

  const sideActions = [
    {
      Icon: ShoppingBag,
      label: quantidade > 0 ? String(quantidade) : t('player_cart_label'),
      fill: false,
      badge: quantidade,
      action: () => setShowCarrinho(true),
    },
    { Icon: Heart,         label: '12.5K',          fill: curtido, badge: 0, action: () => setCurtido((v) => !v) },
    { Icon: MessageCircle, label: '348',            fill: false,   badge: 0, action: () => {} },
    { Icon: Share2,        label: t('player_free'), fill: false,   badge: 0, action: () => {} },
  ]

  function fecharDica() {
    setDicaVista(true)
    localStorage.setItem('dv_dica_v', '1')
  }

  function usarMoedas() {
    const ok = gastar(50, `Ep ${epNum} ${t('player_unlocked_word')} — ${drama?.titulo[lang] ?? ''}`)
    if (ok) {
      desbloquear(chaveEp)
      setErroMoedas(false)
    } else {
      setErroMoedas(true)
    }
  }

  const unlockOptions = [
    {
      Icon: Coins,
      label: t('player_use_coins'),
      right: saldo >= 50 ? `${saldo} 🪙` : t('player_insufficient_short'),
      primary: true,
      action: usarMoedas,
    },
    { Icon: Tv,  label: t('player_watch_ad'),      right: t('player_free'),   primary: false, action: () => {} },
    { Icon: Gem, label: t('player_subscribe_vip'), right: 'R$ 19,90',         primary: false, action: () => navigate('/vip') },
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
            <div style={{ fontSize: 14, fontWeight: 700 }}>{drama.titulo[lang]}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>
              Ep {epNum}: {episodio.titulo[lang]}
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
          {sideActions.map(({ Icon, label, fill, badge, action }) => (
            <div
              key={label}
              onClick={action}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
            >
              <div style={{
                position: 'relative',
                width: 44, height: 44,
                background: badge > 0 ? 'rgba(255,107,26,0.9)' : 'rgba(0,0,0,0.45)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--branco)',
                transition: 'background 0.2s',
              }}>
                <Icon size={22} fill={fill ? 'currentColor' : 'none'} />
                {badge > 0 && (
                  <span style={{
                    position: 'absolute', top: -3, right: -3,
                    minWidth: 19, height: 19, padding: '0 5px',
                    background: 'var(--branco)', color: 'var(--laranja)',
                    borderRadius: 10, fontSize: 11, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                  }}>
                    {badge}
                  </span>
                )}
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
            Ep {epNum}: {episodio.titulo[lang]}
          </h3>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 14, lineHeight: 1.4 }}>
            {drama.descricao[lang]}
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

      {/* ── PRODUTOS DA CENA (marcadores V) ───────────────────────── */}
      {!bloqueado && (
        <SceneHotspots
          produtos={produtosEp}
          img={episodio.thumb}
          dramaId={drama.id}
          dramaTitulo={drama.titulo}
          ep={epNum}
          realcar={showControls || !playing}
        />
      )}

      {/* ── DICA DE PRIMEIRO USO ──────────────────────────────────── */}
      {!bloqueado && !dicaVista && produtosEp.length > 0 && (
        <div
          onClick={(e) => { e.stopPropagation(); fecharDica() }}
          style={{
            position: 'absolute', left: 16, right: 16, bottom: 150, zIndex: 45,
            padding: '14px 16px',
            background: 'rgba(20,20,20,0.96)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,107,26,0.5)',
            borderRadius: 16,
            animation: 'dvSlideUp 0.3s ease-out',
            boxShadow: '0 14px 36px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(255,107,26,0.16)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <VMark size={17} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 3 }}>
                {t('shop_hint_title')}
              </div>
              <p style={{ fontSize: 11.5, color: 'var(--cinza-claro)', lineHeight: 1.5 }}>
                {t('shop_hint_desc')}
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); fecharDica() }}
              aria-label={t('shop_hint_ok')}
              style={{
                background: 'var(--cinza-escuro)', border: 'none', borderRadius: '50%',
                width: 26, height: 26, flexShrink: 0, cursor: 'pointer',
                color: 'var(--branco)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── CARRINHO + CHECKOUT ───────────────────────────────────── */}
      {showCarrinho && (
        <div onClick={(e) => e.stopPropagation()}>
          <CartSheet onClose={() => setShowCarrinho(false)} />
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
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{t('player_locked_title')}</h3>
          <p style={{ color: 'var(--cinza-claro)', fontSize: 14, marginBottom: erroMoedas ? 8 : 24 }}>
            {t('player_locked_desc')}
          </p>
          {erroMoedas && (
            <p style={{ color: '#f87171', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
              {t('player_locked_error')}
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
