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
export const ICON_SIZE = 'iconSize'
export const TEXT_COLOR = 'textColor'
export const ANIMATION = 'animation'
export const EVENT_LOADED = 'loaded'
export const EVENT_CHANGE = 'change'
export const VARIATION = 'variation'
export const FORMAT = 'format'
export const ID = 'id'
export const FEEDBACK = 'feedback'
export const INPUT = 'input'
export const OUTPUT = 'output'

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
  'left',
  'right',
  'center',
  'bottom'
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
  [FILL]: {
    default: FILLS[0],
    validator: FILLS
  },
  [TEXT_COLOR]: {
    default: COLOR_MODES[0],
    validator: COLOR_MODES
  },
  [ICON_POSITION]: {
    default: POSITIONS[0],
    validator: POSITIONS
  },
  [ICON_SIZE]: {
    default: SIZES[1],
    validator: SIZES
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
