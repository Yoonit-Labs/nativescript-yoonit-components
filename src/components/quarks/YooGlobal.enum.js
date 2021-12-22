/**
 * ██╗   ██╗ ██████╗  ██████╗ ███╗   ██╗██╗████████╗
 * ╚██╗ ██╔╝██╔═══██╗██╔═══██╗████╗  ██║██║╚══██╔══╝
 *  ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║   ██║
 *   ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║
 *    ██║   ╚██████╔╝╚██████╔╝██║ ╚████║██║   ██║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝
 *
 * https://yoonit.dev - about@yoonit.dev
 *
 * NativeScript Yoonit Components
 * NativeScript VueJS Atomic Design System framework
 *
 * Luigui Delyer @ 2021
 */

export const SIZE = 'size'
export const FILL = 'fill'
export const ICON = 'icon'
export const ICON_POSITION = 'iconPosition'
export const ICON_FAMILY = 'iconFamily'
export const ICON_SIZE = 'iconSize'
export const TEXT = 'text'
export const TEXT_COLOR = 'textColor'
export const REQUIRED = 'required'
export const ANIMATION = 'animation'
export const ALIGNMENT = 'alignment'
export const EVENT_LOADED = 'loaded'
export const EVENT_CHANGE = 'change'
export const EVENT_OUTPUT = 'output'
export const EVENT_VALIDATED = 'validated'
export const VARIATION = 'variation'
export const FORMAT = 'format'
export const ID = 'id'
export const FEEDBACK = 'feedback'
export const INPUT = 'input'
export const ITEMS = 'items'

const ALIGNMENTS = [
  'left',
  'center',
  'right'
]

const ICON_FAMILIES = [
  'regular',
  'solid',
  'brands'
]

const VARIATIONS = [
  'filled',
  'outline',
  'clear'
]

const FORMATS = [
  'rectangular',
  'square',
  'spherical'
]

const SIZES = [
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl'
]

const FILLS = [
  'primary',
  'secondary',
  'danger',
  'grey',
  'disable',
  'light',
  'dark'
]

const COLOR_MODES = [
  'light',
  'dark'
]

const POSITIONS = [
  'top',
  'right',
  'bottom',
  'left'
]

const ANIMATIONS = [
  'none',
  'pulse'
]

const FEEDBACKS = [
  'error',
  'success'
]

export const OPTIONS = {
  [SIZE]: {
    default: SIZES[3],
    validator: SIZES
  },
  [ALIGNMENT]: {
    default: ALIGNMENTS[1],
    validator: ALIGNMENTS
  },
  [FILL]: {
    default: FILLS[0],
    validator: FILLS
  },
  [TEXT_COLOR]: {
    default: COLOR_MODES[0],
    validator: COLOR_MODES
  },
  [ICON_POSITION]: {
    default: POSITIONS[3],
    validator: POSITIONS
  },
  [ICON_SIZE]: {
    default: SIZES[3],
    validator: SIZES
  },
  [ICON_FAMILY]: {
    default: ICON_FAMILIES[0],
    validator: ICON_FAMILIES
  },
  [ANIMATION]: {
    default: ANIMATIONS[0],
    validator: ANIMATIONS
  },
  [VARIATION]: {
    default: VARIATIONS[0],
    validator: VARIATIONS
  },
  [FORMAT]: {
    default: FORMATS[0],
    validator: FORMATS
  },
  [FEEDBACK]: {
    default: FEEDBACKS[0],
    validator: FEEDBACKS
  }
}
