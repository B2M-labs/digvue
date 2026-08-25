import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, X, Check, Loader2, Mail, MapPin, CreditCard, ClipboardCheck,
  Coins, ShieldCheck, Truck, Zap, Copy, QrCode, Lock, PartyPopper, AlertCircle,
} from 'lucide-react'
import { useCart, type CartItem, type Pedido } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { useLang } from '../context/LangContext'
import { recorteDaCena } from '../data/produtos'
import { VMark } from './Logo'
import {
  formatMoeda, moedasDeCashback, episodiosDeMoedas, CUSTO_EPISODIO,
  maskCodigoPostal, maskCpf, maskTelefone, maskCartao, maskValidade,
  validarEmail, validarCpf, validarTelefone, validarCartao, validarValidade,
  validarCvv, tamanhoCvv, bandeiraDe, NOME_BANDEIRA,
  buscarEndereco, formatoPostalValido, estadosDe, paisDe,
  fretesDe, parcelasDisponiveis, previsaoEntrega, gerarNumeroPedido,
  pixCopiaECola, gradeQr, type Frete,
} from '../data/checkout'

type Etapa = 'contato' | 'entrega' | 'pagamento' | 'revisao' | 'processando' | 'sucesso'

const ORDEM: Etapa[] = ['contato', 'entrega', 'pagamento', 'revisao']

type Form = {
  email: string
  nome: string
  telefone: string
  cpf: string
  cep: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  frete: Frete['id']
  metodo: 'cartao' | 'pix'
  cartaoNumero: string
  cartaoNome: string
  cartaoValidade: string
  cartaoCvv: string
  parcelas: number
}

const FORM_VAZIO: Form = {
  email: '', nome: '', telefone: '', cpf: '',
  cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
  frete: 'padrao', metodo: 'cartao',
  cartaoNumero: '', cartaoNome: '', cartaoValidade: '', cartaoCvv: '', parcelas: 1,
}

type Erros = Partial<Record<keyof Form, string>>

export default function Checkout({
  onClose, onVoltar,
}: { onClose: () => void; onVoltar: () => void }) {
  const { itens, subtotal, limpar, registrarPedido } = useCart()
  const { creditar } = useUser()
  const { lang, t } = useLang()
  const navigate = useNavigate()

  const [etapa, setEtapa] = useState<Etapa>('contato')
  const [form, setForm] = useState<Form>(FORM_VAZIO)
  const [erros, setErros] = useState<Erros>({})
  const [buscandoCep, setBuscandoCep] = useState(false)
  const [cepInfo, setCepInfo] = useState<string | null>(null)
  const [pixCopiado, setPixCopiado] = useState(false)
  const [passoProc, setPassoProc] = useState(0)
  const [pedido, setPedido] = useState<Pedido | null>(null)

  const brasil = lang === 'pt'
  const valorItens = subtotal(lang)
  const fretes = fretesDe(lang, valorItens)
  const freteSel = fretes.find((f) => f.id === form.frete) ?? fretes[0]
  const custoFrete = freteSel.preco
  const total = valorItens + custoFrete
  const moedas = moedasDeCashback(total, lang)
  const previsao = previsaoEntrega(freteSel.dias, lang)

  function set<K extends keyof Form>(campo: K, valor: Form[K]) {
    setForm((f) => ({ ...f, [campo]: valor }))
    setErros((e) => (e[campo] ? { ...e, [campo]: undefined } : e))
  }

  /* ── busca de CEP / ZIP ─────────────────────────────────────────────── */
  async function onCodigoPostal(valor: string) {
    const mascarado = maskCodigoPostal(valor, lang)
    set('cep', mascarado)
    setCepInfo(null)

    if (!formatoPostalValido(mascarado, lang)) return

    setBuscandoCep(true)
    const res = await buscarEndereco(mascarado, lang)
    setBuscandoCep(false)

    if (!res.ok) {
      setErros((e) => ({ ...e, cep: t('co_zip_notfound') }))
      return
    }
    setForm((f) => ({
      ...f,
      rua: res.endereco.rua || f.rua,
      bairro: res.endereco.bairro || f.bairro,
      cidade: res.endereco.cidade || f.cidade,
      estado: res.endereco.estado || f.estado,
    }))
    setCepInfo(res.fonte === 'api' ? t('co_zip_found') : t('co_zip_found_partial'))
  }

  /* ── validação por etapa ────────────────────────────────────────────── */
  function validar(alvo: Etapa): Erros {
    const e: Erros = {}
    if (alvo === 'contato') {
      if (!validarEmail(form.email)) e.email = t('co_email_err')
      if (form.nome.trim().split(/\s+/).length < 2) e.nome = t('co_name_err')
      if (!validarTelefone(form.telefone, lang)) e.telefone = t('co_phone_err')
      if (brasil && !validarCpf(form.cpf)) e.cpf = t('co_cpf_err')
    }
    if (alvo === 'entrega') {
      if (!formatoPostalValido(form.cep, lang)) e.cep = t('co_zip_err')
      if (!form.rua.trim()) e.rua = t('co_street_err')
      if (brasil && !form.numero.trim()) e.numero = t('co_number_err')
      if (!form.cidade.trim()) e.cidade = t('co_city_err')
      if (!form.estado.trim()) e.estado = t('co_state_err')
    }
    if (alvo === 'pagamento' && form.metodo === 'cartao') {
      if (!validarCartao(form.cartaoNumero)) e.cartaoNumero = t('co_card_number_err')
      if (form.cartaoNome.trim().split(/\s+/).length < 2) e.cartaoNome = t('co_card_name_err')
      if (!validarValidade(form.cartaoValidade)) e.cartaoValidade = t('co_card_exp_err')
      if (!validarCvv(form.cartaoCvv, form.cartaoNumero)) e.cartaoCvv = t('co_card_cvv_err')
    }
    return e
  }

  function avancar() {
    const e = validar(etapa)
    if (Object.keys(e).length > 0) {
      setErros(e)
      return
    }
    const i = ORDEM.indexOf(etapa)
    if (i < ORDEM.length - 1) setEtapa(ORDEM[i + 1])
    else setEtapa('processando')
  }

  function voltar() {
    const i = ORDEM.indexOf(etapa)
    if (i > 0) setEtapa(ORDEM[i - 1])
    else onVoltar()
  }

  /* ── processamento simulado do pagamento ────────────────────────────── */
  const finalizado = useRef(false)

  useEffect(() => {
    if (etapa !== 'processando' || finalizado.current) return
    finalizado.current = true

    const timers: number[] = []
    timers.push(window.setTimeout(() => setPassoProc(1), 900))
    timers.push(window.setTimeout(() => setPassoProc(2), 1800))
    timers.push(window.setTimeout(() => {
      const numero = gerarNumeroPedido(Date.now())
      const novo: Pedido = {
        numero,
        criadoEm: new Date().toISOString(),
        itens: itens as CartItem[],
        lang,
        subtotal: valorItens,
        frete: custoFrete,
        total,
        moedas,
        pagamento: form.metodo === 'pix'
          ? 'PIX'
          : `${NOME_BANDEIRA[bandeiraDe(form.cartaoNumero)] || t('co_pay_card')} ••••${form.cartaoNumero.replace(/\D/g, '').slice(-4)}`,
        entrega: [
          form.rua, brasil && form.numero ? form.numero : '', form.complemento,
          form.bairro, `${form.cidade} - ${form.estado}`, form.cep, paisDe(lang),
        ].filter(Boolean).join(', '),
        email: form.email.trim(),
        previsao,
      }
      setPedido(novo)
      registrarPedido(novo)
      creditar(moedas, t('co_coins_history').replace('{n}', numero))
      limpar()
      setEtapa('sucesso')
    }, 2900))

    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etapa])

  /* ── render ─────────────────────────────────────────────────────────── */
  const passoAtual = ORDEM.indexOf(etapa)
  const emFormulario = passoAtual >= 0

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 210,
      display: 'flex', justifyContent: 'center',
      background: 'rgba(0,0,0,0.6)',
    }}>
      <div style={{
        width: '100%', maxWidth: 480,
        background: 'var(--preto)',
        display: 'flex', flexDirection: 'column',
        animation: 'dvSlideUp 0.26s ease-out',
      }}>
        {/* ── topo ──────────────────────────────────────────────────── */}
        {etapa !== 'processando' && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: 'calc(14px + env(safe-area-inset-top)) 16px 14px',
            borderBottom: '1px solid var(--cinza-escuro)',
            flexShrink: 0,
          }}>
            {etapa !== 'sucesso' && (
              <button onClick={voltar} aria-label={t('co_back')} style={iconBtn}>
                <ArrowLeft size={17} />
              </button>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800 }}>
                {etapa === 'sucesso' ? t('co_ok_header') : t('co_title')}
              </div>
              {emFormulario && (
                <div style={{ fontSize: 11, color: 'var(--cinza-claro)', marginTop: 1 }}>
                  {t('co_step_of').replace('{a}', String(passoAtual + 1)).replace('{b}', '4')} •{' '}
                  {t(`co_step_${etapa}`)}
                </div>
              )}
            </div>
            <button onClick={onClose} aria-label={t('co_close')} style={iconBtn}>
              <X size={17} />
            </button>
          </div>
        )}

        {/* ── barra de progresso ────────────────────────────────────── */}
        {emFormulario && (
          <div style={{ display: 'flex', gap: 4, padding: '12px 16px 0', flexShrink: 0 }}>
            {ORDEM.map((p, i) => (
              <div
                key={p}
                style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: i <= passoAtual ? 'var(--laranja)' : 'var(--cinza-escuro)',
                  transition: 'background 0.25s',
                }}
              />
            ))}
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 24px' }}>
          {/* ── 1. CONTATO ─────────────────────────────────────────── */}
          {etapa === 'contato' && (
            <>
              <Cabecalho Icon={Mail} titulo={t('co_contact_title')} desc={t('co_contact_desc')} />
              <Campo label={t('co_email')} erro={erros.email} dica={t('co_email_note')}>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t('co_email_ph')}
                  value={form.email}
                  onChange={(ev) => set('email', ev.target.value)}
                  style={input(!!erros.email)}
                />
              </Campo>
              <Campo label={t('co_name')} erro={erros.nome}>
                <input
                  autoComplete="name"
                  placeholder={t('co_name_ph')}
                  value={form.nome}
                  onChange={(ev) => set('nome', ev.target.value)}
                  style={input(!!erros.nome)}
                />
              </Campo>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <Campo label={t('co_phone')} erro={erros.telefone}>
                    <input
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={t('co_phone_ph')}
                      value={form.telefone}
                      onChange={(ev) => set('telefone', maskTelefone(ev.target.value, lang))}
                      style={input(!!erros.telefone)}
                    />
                  </Campo>
                </div>
                {brasil && (
                  <div style={{ flex: 1 }}>
                    <Campo label={t('co_cpf')} erro={erros.cpf}>
                      <input
                        inputMode="numeric"
                        placeholder={t('co_cpf_ph')}
                        value={form.cpf}
                        onChange={(ev) => set('cpf', maskCpf(ev.target.value))}
                        style={input(!!erros.cpf)}
                      />
                    </Campo>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── 2. ENTREGA ─────────────────────────────────────────── */}
          {etapa === 'entrega' && (
            <>
              <Cabecalho
                Icon={MapPin}
                titulo={t('co_ship_title')}
                desc={t('co_ship_desc').replace('{pais}', paisDe(lang))}
              />

              <Campo
                label={brasil ? t('co_cep') : t('co_zip')}
                erro={erros.cep}
                dica={buscandoCep ? t('co_zip_searching') : cepInfo ?? undefined}
                dicaOk={!!cepInfo && !buscandoCep}
              >
                <div style={{ position: 'relative' }}>
                  <input
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder={brasil ? '01310-100' : '10001'}
                    value={form.cep}
                    onChange={(ev) => onCodigoPostal(ev.target.value)}
                    style={input(!!erros.cep)}
                  />
                  {buscandoCep && (
                    <Loader2
                      size={16}
                      style={{
                        position: 'absolute', right: 12, top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--laranja)', animation: 'dvSpin 0.9s linear infinite',
                      }}
                    />
                  )}
                </div>
              </Campo>

              <Campo label={brasil ? t('co_street') : t('co_street_us')} erro={erros.rua}>
                <input
                  autoComplete="street-address"
                  placeholder={brasil ? t('co_street_ph') : t('co_street_us_ph')}
                  value={form.rua}
                  onChange={(ev) => set('rua', ev.target.value)}
                  style={input(!!erros.rua)}
                />
              </Campo>

              <div style={{ display: 'flex', gap: 10 }}>
                {brasil && (
                  <div style={{ width: 110 }}>
                    <Campo label={t('co_number')} erro={erros.numero}>
                      <input
                        inputMode="numeric"
                        placeholder="123"
                        value={form.numero}
                        onChange={(ev) => set('numero', ev.target.value)}
                        style={input(!!erros.numero)}
                      />
                    </Campo>
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <Campo label={brasil ? t('co_complement') : t('co_apt')}>
                    <input
                      placeholder={brasil ? t('co_complement_ph') : t('co_apt_ph')}
                      value={form.complemento}
                      onChange={(ev) => set('complemento', ev.target.value)}
                      style={input(false)}
                    />
                  </Campo>
                </div>
              </div>

              {brasil && (
                <Campo label={t('co_district')}>
                  <input
                    placeholder={t('co_district_ph')}
                    value={form.bairro}
                    onChange={(ev) => set('bairro', ev.target.value)}
                    style={input(false)}
                  />
                </Campo>
              )}

              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <Campo label={t('co_city')} erro={erros.cidade}>
                    <input
                      autoComplete="address-level2"
                      placeholder={brasil ? 'São Paulo' : 'New York'}
                      value={form.cidade}
                      onChange={(ev) => set('cidade', ev.target.value)}
                      style={input(!!erros.cidade)}
                    />
                  </Campo>
                </div>
                <div style={{ width: 96 }}>
                  <Campo label={t('co_state')} erro={erros.estado}>
                    <select
                      value={form.estado}
                      onChange={(ev) => set('estado', ev.target.value)}
                      style={{ ...input(!!erros.estado), appearance: 'none' }}
                    >
                      <option value="">—</option>
                      {estadosDe(lang).map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </Campo>
                </div>
              </div>

              <div style={{ fontSize: 12, fontWeight: 700, margin: '8px 0 8px' }}>
                {t('co_shipping_method')}
              </div>
              {fretes.map((f) => {
                const sel = form.frete === f.id
                return (
                  <button
                    key={f.id}
                    onClick={() => set('frete', f.id)}
                    style={{
                      width: '100%', marginBottom: 8, padding: 13,
                      background: sel ? 'rgba(255,107,26,0.1)' : 'var(--cinza-escuro)',
                      border: `1px solid ${sel ? 'var(--laranja)' : 'transparent'}`,
                      borderRadius: 12, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left',
                      color: 'var(--branco)',
                    }}
                  >
                    <div style={{ color: sel ? 'var(--laranja)' : 'var(--cinza-claro)' }}>
                      {f.id === 'padrao' ? <Truck size={18} /> : <Zap size={18} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>
                        {t(f.id === 'padrao' ? 'co_ship_standard' : 'co_ship_express')}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--cinza-claro)', marginTop: 2 }}>
                        {previsaoEntrega(f.dias, lang)}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 13, fontWeight: 800,
                      color: f.preco === 0 ? '#4ade80' : 'var(--branco)',
                    }}>
                      {f.preco === 0 ? t('co_ship_free') : formatMoeda(f.preco, lang)}
                    </div>
                  </button>
                )
              })}
            </>
          )}

          {/* ── 3. PAGAMENTO ───────────────────────────────────────── */}
          {etapa === 'pagamento' && (
            <>
              <Cabecalho Icon={CreditCard} titulo={t('co_pay_title')} desc={t('co_pay_desc')} />

              {brasil && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  {(['cartao', 'pix'] as const).map((m) => {
                    const sel = form.metodo === m
                    return (
                      <button
                        key={m}
                        onClick={() => set('metodo', m)}
                        style={{
                          flex: 1, padding: '11px 8px',
                          background: sel ? 'var(--laranja)' : 'var(--cinza-escuro)',
                          border: 'none', borderRadius: 10,
                          color: 'var(--branco)', fontSize: 13, fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        }}
                      >
                        {m === 'cartao' ? <CreditCard size={15} /> : <QrCode size={15} />}
                        {t(m === 'cartao' ? 'co_pay_card' : 'co_pay_pix')}
                      </button>
                    )
                  })}
                </div>
              )}

              {form.metodo === 'cartao' ? (
                <>
                  <CartaoVisual
                    numero={form.cartaoNumero}
                    nome={form.cartaoNome}
                    validade={form.cartaoValidade}
                    placeholderNome={t('co_card_name_ph')}
                  />

                  <Campo label={t('co_card_number')} erro={erros.cartaoNumero}>
                    <div style={{ position: 'relative' }}>
                      <input
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="4111 1111 1111 1111"
                        value={form.cartaoNumero}
                        onChange={(ev) => set('cartaoNumero', maskCartao(ev.target.value))}
                        style={input(!!erros.cartaoNumero)}
                      />
                      {NOME_BANDEIRA[bandeiraDe(form.cartaoNumero)] && (
                        <span style={{
                          position: 'absolute', right: 12, top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: 11, fontWeight: 800, color: 'var(--laranja)',
                        }}>
                          {NOME_BANDEIRA[bandeiraDe(form.cartaoNumero)]}
                        </span>
                      )}
                    </div>
                  </Campo>

                  <Campo label={t('co_card_name')} erro={erros.cartaoNome}>
                    <input
                      autoComplete="cc-name"
                      placeholder={t('co_card_name_ph')}
                      value={form.cartaoNome}
                      onChange={(ev) => set('cartaoNome', ev.target.value.toUpperCase())}
                      style={input(!!erros.cartaoNome)}
                    />
                  </Campo>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <Campo label={t('co_card_exp')} erro={erros.cartaoValidade}>
                        <input
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder={t('co_card_exp_ph')}
                          value={form.cartaoValidade}
                          onChange={(ev) => set('cartaoValidade', maskValidade(ev.target.value))}
                          style={input(!!erros.cartaoValidade)}
                        />
                      </Campo>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Campo label={t('co_card_cvv')} erro={erros.cartaoCvv}>
                        <input
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          placeholder={tamanhoCvv(form.cartaoNumero) === 4 ? '1234' : '123'}
                          maxLength={tamanhoCvv(form.cartaoNumero)}
                          value={form.cartaoCvv}
                          onChange={(ev) => set('cartaoCvv', ev.target.value.replace(/\D/g, ''))}
                          style={input(!!erros.cartaoCvv)}
                        />
                      </Campo>
                    </div>
                  </div>

                  {brasil && (
                    <Campo label={t('co_installments')}>
                      <select
                        value={form.parcelas}
                        onChange={(ev) => set('parcelas', Number(ev.target.value))}
                        style={{ ...input(false), appearance: 'none' }}
                      >
                        {parcelasDisponiveis(total).map((n) => (
                          <option key={n} value={n}>
                            {n}x {formatMoeda(total / n, lang)} {t('co_interest_free')}
                          </option>
                        ))}
                      </select>
                    </Campo>
                  )}
                </>
              ) : (
                <Pix
                  pedido="PREVIEW"
                  valor={total}
                  lang={lang}
                  copiado={pixCopiado}
                  onCopiar={() => {
                    setPixCopiado(true)
                    window.setTimeout(() => setPixCopiado(false), 2000)
                  }}
                  t={t}
                />
              )}

              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                marginTop: 14, padding: '10px 12px',
                background: 'var(--cinza-escuro)', borderRadius: 10,
              }}>
                <ShieldCheck size={16} color="#4ade80" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: 'var(--cinza-claro)', lineHeight: 1.45 }}>
                  {t('co_secure_note')}
                </span>
              </div>
            </>
          )}

          {/* ── 4. REVISÃO ─────────────────────────────────────────── */}
          {etapa === 'revisao' && (
            <>
              <Cabecalho Icon={ClipboardCheck} titulo={t('co_review_title')} desc={t('co_review_desc')} />

              <Bloco titulo={t('co_review_items')}>
                {itens.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '7px 0' }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 8, flexShrink: 0,
                      ...recorteDaCena(item.img, item.spot, item.zoom),
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>
                        {item.titulo[lang]}
                      </div>
                      <div style={{ fontSize: 10.5, color: 'var(--cinza-claro)', marginTop: 2 }}>
                        {item.qtd}× • Ep {item.ep}
                      </div>
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 700 }}>
                      {formatMoeda(item.preco[lang] * item.qtd, lang)}
                    </span>
                  </div>
                ))}
              </Bloco>

              <Bloco titulo={t('co_review_contact')} onEditar={() => setEtapa('contato')} editarLabel={t('co_edit')}>
                <Linha valor={form.email} />
                <Linha valor={form.nome} />
                <Linha valor={form.telefone} />
                {brasil && <Linha valor={`CPF ${form.cpf}`} />}
              </Bloco>

              <Bloco titulo={t('co_review_ship')} onEditar={() => setEtapa('entrega')} editarLabel={t('co_edit')}>
                <Linha valor={brasil ? `${form.rua}, ${form.numero}` : form.rua} />
                {form.complemento && <Linha valor={form.complemento} />}
                {brasil && form.bairro && <Linha valor={form.bairro} />}
                <Linha valor={`${form.cidade} - ${form.estado} • ${form.cep}`} />
                <Linha valor={paisDe(lang)} />
                <Linha valor={`${t(freteSel.id === 'padrao' ? 'co_ship_standard' : 'co_ship_express')} • ${previsao}`} destaque />
              </Bloco>

              <Bloco titulo={t('co_review_pay')} onEditar={() => setEtapa('pagamento')} editarLabel={t('co_edit')}>
                {form.metodo === 'pix' ? (
                  <Linha valor="PIX" />
                ) : (
                  <>
                    <Linha valor={`${NOME_BANDEIRA[bandeiraDe(form.cartaoNumero)] || t('co_pay_card')} •••• ${form.cartaoNumero.replace(/\D/g, '').slice(-4)}`} />
                    {brasil && (
                      <Linha valor={`${form.parcelas}x ${formatMoeda(total / form.parcelas, lang)}`} />
                    )}
                  </>
                )}
              </Bloco>

              <div style={{
                background: 'var(--cinza-escuro)', borderRadius: 14,
                padding: 14, marginBottom: 14,
              }}>
                <Total label={t('co_sum_items')} valor={formatMoeda(valorItens, lang)} />
                <Total
                  label={t('co_sum_shipping')}
                  valor={custoFrete === 0 ? t('co_ship_free') : formatMoeda(custoFrete, lang)}
                  verde={custoFrete === 0}
                />
                <div style={{ height: 1, background: 'var(--cinza-medio)', margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 14, fontWeight: 800 }}>{t('co_sum_total')}</span>
                  <span style={{ fontSize: 24, fontWeight: 800 }}>{formatMoeda(total, lang)}</span>
                </div>
              </div>

              <CashbackBox moedas={moedas} t={t} />
            </>
          )}

          {/* ── PROCESSANDO ────────────────────────────────────────── */}
          {etapa === 'processando' && (
            <div style={{
              minHeight: '70dvh',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 26,
            }}>
              <div style={{ position: 'relative', width: 72, height: 72 }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  border: '3px solid var(--cinza-escuro)',
                  borderTopColor: 'var(--laranja)',
                  borderRadius: '50%',
                  animation: 'dvSpin 0.85s linear infinite',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <VMark size={26} />
                </div>
              </div>

              <div style={{ width: '100%', maxWidth: 260 }}>
                {['co_proc_1', 'co_proc_2', 'co_proc_3'].map((k, i) => (
                  <div
                    key={k}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '9px 0',
                      opacity: i <= passoProc ? 1 : 0.32,
                      transition: 'opacity 0.3s',
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      background: i < passoProc ? '#4ade80' : i === passoProc ? 'var(--laranja)' : 'var(--cinza-escuro)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {i < passoProc
                        ? <Check size={12} strokeWidth={3.5} />
                        : i === passoProc
                          ? <Loader2 size={12} style={{ animation: 'dvSpin 0.9s linear infinite' }} />
                          : null}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{t(k)}</span>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 11, color: 'var(--cinza-claro)',
              }}>
                <Lock size={12} /> {t('co_proc_secure')}
              </div>
            </div>
          )}

          {/* ── SUCESSO ────────────────────────────────────────────── */}
          {etapa === 'sucesso' && pedido && (
            <div style={{ textAlign: 'center', paddingTop: 12 }}>
              <div style={{
                width: 76, height: 76, borderRadius: '50%',
                background: 'rgba(74,222,128,0.14)',
                border: '2px solid #4ade80',
                margin: '0 auto 18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'dvPop 0.35s ease-out',
              }}>
                <Check size={38} strokeWidth={3} color="#4ade80" />
              </div>

              <h3 style={{ fontSize: 21, fontWeight: 800, marginBottom: 7 }}>{t('co_ok_title')}</h3>
              <p style={{ fontSize: 13, color: 'var(--cinza-claro)', lineHeight: 1.55, marginBottom: 20 }}>
                {t('co_ok_desc').replace('{email}', pedido.email)}
              </p>

              {/* moedas ganhas */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(74,222,128,0.14), rgba(74,222,128,0.04))',
                border: '1px solid rgba(74,222,128,0.4)',
                borderRadius: 16, padding: 18, marginBottom: 14,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 8, marginBottom: 6,
                }}>
                  <Coins size={20} color="#4ade80" />
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: 40,
                    lineHeight: 1, color: '#4ade80',
                  }}>
                    +{pedido.moedas}
                  </span>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>
                  {t('co_ok_coins')}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--cinza-claro)', lineHeight: 1.5 }}>
                  {(() => {
                    const { inteiros, resto } = episodiosDeMoedas(pedido.moedas)
                    return inteiros >= 1
                      ? t('co_ok_coins_eps').replace('{n}', String(inteiros))
                      : t('co_ok_coins_progress')
                          .replace('{falta}', String(CUSTO_EPISODIO - resto))
                  })()}
                </div>
              </div>

              {/* resumo do pedido */}
              <div style={{
                background: 'var(--cinza-escuro)', borderRadius: 14,
                padding: 14, marginBottom: 18, textAlign: 'left',
              }}>
                <Total label={t('co_ok_order')} valor={pedido.numero} />
                <Total label={t('co_sum_total')} valor={formatMoeda(pedido.total, lang)} />
                <Total label={t('co_ok_eta')} valor={pedido.previsao} />
                <Total label={t('co_review_pay')} valor={pedido.pagamento} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <button
                  onClick={() => { onClose(); navigate('/carteira') }}
                  style={{
                    padding: 14, background: 'var(--laranja)', border: 'none', borderRadius: 12,
                    color: 'var(--branco)', fontSize: 14, fontWeight: 800, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  }}
                >
                  <Coins size={16} /> {t('co_ok_wallet')}
                </button>
                <button
                  onClick={onClose}
                  style={{
                    padding: 14, background: 'var(--cinza-escuro)',
                    border: '1px solid var(--cinza-medio)', borderRadius: 12,
                    color: 'var(--branco)', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  }}
                >
                  <PartyPopper size={16} /> {t('co_ok_keep_watching')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── rodapé de ação ────────────────────────────────────────── */}
        {emFormulario && (
          <div style={{
            flexShrink: 0,
            padding: '12px 16px calc(16px + env(safe-area-inset-bottom))',
            borderTop: '1px solid var(--cinza-escuro)',
            background: 'var(--preto-suave)',
          }}>
            {etapa !== 'revisao' && (
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: 12, color: 'var(--cinza-claro)', marginBottom: 10,
              }}>
                <span>{t('co_sum_total')}</span>
                <span style={{ fontWeight: 800, color: 'var(--branco)', fontSize: 15 }}>
                  {formatMoeda(total, lang)}
                </span>
              </div>
            )}
            <button
              onClick={avancar}
              style={{
                width: '100%', padding: 15,
                background: 'var(--laranja)', border: 'none', borderRadius: 13,
                color: 'var(--branco)', fontSize: 15, fontWeight: 800, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 8px 22px rgba(255,107,26,0.3)',
              }}
            >
              {etapa === 'revisao'
                ? <><Lock size={15} /> {t('co_pay_now').replace('{valor}', formatMoeda(total, lang))}</>
                : t('co_continue')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   PEÇAS DE UI
   ──────────────────────────────────────────────────────────────────────────── */

const iconBtn: CSSProperties = {
  width: 32, height: 32, flexShrink: 0,
  background: 'var(--cinza-escuro)', border: 'none', borderRadius: '50%',
  color: 'var(--branco)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

function input(erro: boolean): CSSProperties {
  return {
    width: '100%',
    padding: '12px 13px',
    background: 'var(--cinza-escuro)',
    border: `1px solid ${erro ? '#f87171' : 'var(--cinza-medio)'}`,
    borderRadius: 10,
    color: 'var(--branco)',
    fontSize: 14,
    outline: 'none',
  }
}

function Cabecalho({
  Icon, titulo, desc,
}: { Icon: typeof Mail; titulo: string; desc: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 5 }}>
        <Icon size={18} color="var(--laranja)" />
        <span style={{ fontSize: 16, fontWeight: 800 }}>{titulo}</span>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--cinza-claro)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  )
}

function Campo({
  label, erro, dica, dicaOk, children,
}: {
  label: string
  erro?: string
  dica?: string
  dicaOk?: boolean
  children: ReactNode
}) {
  return (
    <div style={{ marginBottom: 13 }}>
      <label style={{
        display: 'block', fontSize: 11.5, fontWeight: 700,
        color: 'var(--cinza-claro)', marginBottom: 6,
        textTransform: 'uppercase', letterSpacing: 0.5,
      }}>
        {label}
      </label>
      {children}
      {erro && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontSize: 11, color: '#f87171', marginTop: 5, fontWeight: 600,
        }}>
          <AlertCircle size={12} /> {erro}
        </div>
      )}
      {!erro && dica && (
        <div style={{
          fontSize: 11, marginTop: 5,
          color: dicaOk ? '#4ade80' : 'var(--cinza-claro)',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          {dicaOk && <Check size={12} strokeWidth={3} />} {dica}
        </div>
      )}
    </div>
  )
}

function Bloco({
  titulo, children, onEditar, editarLabel,
}: {
  titulo: string
  children: ReactNode
  onEditar?: () => void
  editarLabel?: string
}) {
  return (
    <div style={{
      background: 'var(--cinza-escuro)', borderRadius: 14,
      padding: 14, marginBottom: 10,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 8,
      }}>
        <span style={{
          fontSize: 10.5, fontWeight: 800, color: 'var(--cinza-claro)',
          textTransform: 'uppercase', letterSpacing: 0.7,
        }}>
          {titulo}
        </span>
        {onEditar && (
          <button
            onClick={onEditar}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--laranja)', fontSize: 11.5, fontWeight: 700, padding: 0,
            }}
          >
            {editarLabel}
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

function Linha({ valor, destaque }: { valor: string; destaque?: boolean }) {
  return (
    <div style={{
      fontSize: 12.5, lineHeight: 1.6,
      color: destaque ? 'var(--laranja)' : 'rgba(255,255,255,0.86)',
      fontWeight: destaque ? 700 : 500,
    }}>
      {valor}
    </div>
  )
}

function Total({ label, valor, verde }: { label: string; valor: string; verde?: boolean }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '4px 0', fontSize: 12.5,
    }}>
      <span style={{ color: 'var(--cinza-claro)' }}>{label}</span>
      <span style={{ fontWeight: 700, color: verde ? '#4ade80' : 'var(--branco)' }}>{valor}</span>
    </div>
  )
}

function CashbackBox({ moedas, t }: { moedas: number; t: (k: string) => string }) {
  const { inteiros } = episodiosDeMoedas(moedas)
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 11,
      padding: 13,
      background: 'rgba(74,222,128,0.09)',
      border: '1px solid rgba(74,222,128,0.3)',
      borderRadius: 13,
    }}>
      <Coins size={20} color="#4ade80" style={{ flexShrink: 0 }} />
      <div style={{ fontSize: 12, lineHeight: 1.5 }}>
        <div style={{ fontWeight: 800, color: '#4ade80', marginBottom: 2 }}>
          {t('co_sum_coins').replace('{n}', String(moedas))}
        </div>
        <div style={{ color: 'var(--cinza-claro)', fontSize: 11 }}>
          {inteiros >= 1
            ? t('cart_coins_eps').replace('{n}', String(inteiros))
            : t('cart_coins_hint')}
        </div>
      </div>
    </div>
  )
}

/** Prévia do cartão que preenche em tempo real. */
function CartaoVisual({
  numero, nome, validade, placeholderNome,
}: { numero: string; nome: string; validade: string; placeholderNome: string }) {
  const bandeira = bandeiraDe(numero)
  const grupos = (numero || '•••• •••• •••• ••••').padEnd(19, '•')

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1F2933 0%, #17334D 55%, #0F1A26 100%)',
      borderRadius: 16, padding: 18, marginBottom: 18,
      boxShadow: '0 12px 30px rgba(0,0,0,0.45)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 130, height: 130, borderRadius: '50%',
        background: 'rgba(255,107,26,0.14)',
      }} />
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: 22,
      }}>
        <div style={{ width: 38, height: 27, borderRadius: 5, background: 'linear-gradient(135deg,#E8C46B,#B8912F)' }} />
        <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--laranja)', letterSpacing: 0.5 }}>
          {NOME_BANDEIRA[bandeira]}
        </span>
      </div>
      <div style={{
        fontFamily: 'ui-monospace, monospace', fontSize: 17,
        letterSpacing: 1.6, marginBottom: 16, color: 'rgba(255,255,255,0.94)',
      }}>
        {grupos}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.8, marginBottom: 3 }}>
            {placeholderNome.toUpperCase()}
          </div>
          <div style={{
            fontSize: 11.5, fontWeight: 700, letterSpacing: 0.6,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {nome || '—'}
          </div>
        </div>
        <div style={{ fontSize: 11.5, fontWeight: 700, fontFamily: 'ui-monospace, monospace' }}>
          {validade || 'MM/AA'}
        </div>
      </div>
    </div>
  )
}

/** Pagamento PIX simulado com QR determinístico. */
function Pix({
  pedido, valor, lang, copiado, onCopiar, t,
}: {
  pedido: string
  valor: number
  lang: 'pt' | 'en'
  copiado: boolean
  onCopiar: () => void
  t: (k: string) => string
}) {
  const chave = pixCopiaECola(pedido, valor)
  const grade = gradeQr(chave)

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        background: '#FFFFFF', borderRadius: 14, padding: 14,
        width: 'fit-content', margin: '0 auto 14px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${grade.length}, 7px)`,
          gap: 0,
        }}>
          {grade.flatMap((linha, y) =>
            linha.map((preenchido, x) => (
              <div
                key={`${y}-${x}`}
                style={{ width: 7, height: 7, background: preenchido ? '#0A0A0A' : '#FFFFFF' }}
              />
            ))
          )}
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{t('co_pix_title')}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--laranja)', marginBottom: 6 }}>
        {formatMoeda(valor, lang)}
      </div>
      <p style={{ fontSize: 11.5, color: 'var(--cinza-claro)', lineHeight: 1.5, marginBottom: 14 }}>
        {t('co_pix_desc')}
      </p>

      <button
        onClick={() => {
          navigator.clipboard?.writeText(chave).catch(() => {})
          onCopiar()
        }}
        style={{
          width: '100%', padding: 12,
          background: copiado ? 'rgba(74,222,128,0.16)' : 'var(--cinza-escuro)',
          border: `1px solid ${copiado ? '#4ade80' : 'var(--cinza-medio)'}`,
          borderRadius: 11, color: copiado ? '#4ade80' : 'var(--branco)',
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        }}
      >
        {copiado ? <><Check size={15} /> {t('co_pix_copied')}</> : <><Copy size={15} /> {t('co_pix_copy')}</>}
      </button>
    </div>
  )
}
