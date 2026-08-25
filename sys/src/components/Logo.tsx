/**
 * Identidade DigVue em SVG — sem fundo, escalável.
 *
 * `DigVueLogo`  → wordmark completo (Dig + V-olho + ue)
 * `VMark`       → apenas o V com o olho, usado como marcador de produto na cena
 *
 * O "V" é desenhado como path (não como fonte) porque é o glifo assinatura:
 * o olho precisa caber exatamente dentro dos braços. "Dig" e "ue" usam <text>
 * com `textLength` fixo, então o traçado permanece alinhado mesmo se a fonte
 * ainda não tiver carregado.
 */

const NAVY = '#17334D'
const ORANGE = '#FF6B1A'

/** V do wordmark: caixa x 112→176, y 14→66 (altura de caixa alta 52). */
const V_PATH = 'M112 14 L131 14 L144 38 L157 14 L176 14 L152 66 L136 66 Z'
/** Amêndoa do olho, centro (144, 51). */
const V_EYE = 'M132 51 Q144 42.5 156 51 Q144 59.5 132 51 Z'

/** Mesma geometria normalizada para viewBox 0 0 64 64. */
const MARK_PATH = 'M0 6 L19 6 L32 30 L45 6 L64 6 L40 58 L24 58 Z'
const MARK_EYE = 'M20 43 Q32 34.5 44 43 Q32 51.5 20 43 Z'

type LogoProps = {
  /** altura renderizada em px (a largura acompanha a proporção 3:1) */
  height?: number
  /** `dark` = sobre fundo escuro (Dig em branco); `light` = sobre fundo claro (Dig em navy) */
  tone?: 'dark' | 'light'
  title?: string
}

export function DigVueLogo({ height = 30, tone = 'dark', title = 'DigVue' }: LogoProps) {
  const digColor = tone === 'dark' ? '#FFFFFF' : NAVY

  return (
    <svg
      viewBox="0 0 264 80"
      height={height}
      width={height * (264 / 80)}
      role="img"
      aria-label={title}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <title>{title}</title>

      <text
        x="0"
        y="66"
        textLength="112"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="72"
        fontWeight="800"
        fill={digColor}
      >
        Dig
      </text>

      <path d={V_PATH} fill={ORANGE} />
      <path d={V_EYE} fill="#FFFFFF" />
      <circle cx="144" cy="51" r="4.6" fill={NAVY} />

      <text
        x="176"
        y="66"
        textLength="86"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="72"
        fontWeight="800"
        fill={ORANGE}
      >
        ue
      </text>
    </svg>
  )
}

type VMarkProps = {
  size?: number
  /** cor do V; o olho é sempre branco com pupila escura */
  color?: string
  eye?: string
  pupil?: string
}

/** Marcador de cena: o V do logo com o olho, sozinho. */
export function VMark({
  size = 16,
  color = ORANGE,
  eye = '#FFFFFF',
  pupil = NAVY,
}: VMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <path d={MARK_PATH} fill={color} />
      <path d={MARK_EYE} fill={eye} />
      <circle cx="32" cy="43" r="4.6" fill={pupil} />
    </svg>
  )
}

export const CORES_LOGO = { navy: NAVY, laranja: ORANGE }
